import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreatePersonalInfoDto, UpdatePersonalInfoDto } from './dto'
import { PrismaService } from 'src/prisma'
import { UsersService } from 'src/users/users/users.service'
import { SubparametersService } from 'src/parametric/subparameters/subparameters.service'
import { User } from 'src/users/users/entities/user.entity'
import { PersonalInfo } from './entities/personal-info.entity'

const personalInfoIncludes = {
  creator: true,
  updater: true,
  user: true,
  gender: true,
  ciExtension: true
}

@Injectable()
export class PersonalInfoService {

  constructor (
    private readonly prismaService : PrismaService,
    private readonly usersService : UsersService,
    private readonly subparametersService : SubparametersService
  ) {}

  async create ( createPersonalInfoDto : CreatePersonalInfoDto, creator : User ) : Promise<PersonalInfo> {
    const { userId, genderId, ciExtensionId } = createPersonalInfoDto
    await this.usersService.findOne( userId )
    await this.subparametersService.findOne( genderId )
    await this.subparametersService.findOne( ciExtensionId )
    try {
      const personalInfo = await this.prismaService.personalInfo.create({
        data: {
          ...createPersonalInfoDto,
          birthDate: new Date( createPersonalInfoDto.birthDate ),
          createdBy: creator.id
        },
        include: { ...personalInfoIncludes }
      })
      return personalInfo
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () : Promise<PersonalInfo[]> {
    const personalInfos = await this.prismaService.personalInfo.findMany({
      include: { ...personalInfoIncludes }
    })
    return personalInfos
  }

  async findOne ( id : string ) : Promise<PersonalInfo> {
    const personalInfo = await this.prismaService.personalInfo.findUnique({
      where: { id },
      include: { ...personalInfoIncludes }
    })
    if ( !personalInfo ) throw new NotFoundException( 'No se encontró información personal' )
    return personalInfo
  }

  async findOneByUser ( userId : string ) : Promise<PersonalInfo> {
    const personalInfo = await this.prismaService.personalInfo.findFirst({
      where: { userId },
      include: { ...personalInfoIncludes }
    })
    if ( !personalInfo ) throw new NotFoundException( 'No se encontró información personal del usuario' )
    return personalInfo
  }

  async update( id : string, updatePersonalInfoDto : UpdatePersonalInfoDto, updater : User ) : Promise<PersonalInfo> {
    await this.findOne( id )
    const { userId, genderId, ciExtensionId } = updatePersonalInfoDto
    if ( userId ) await this.usersService.findOne( userId )
    if ( genderId ) await this.subparametersService.findOne( genderId )
    if ( ciExtensionId ) await this.subparametersService.findOne( ciExtensionId )
    try {
      const birthDate = updatePersonalInfoDto.birthDate ? new Date( updatePersonalInfoDto.birthDate ) : undefined
      const personalInfo = await this.prismaService.personalInfo.update({
        where: { id },
        data: {
          ...updatePersonalInfoDto,
          birthDate,
          updatedBy: updater.id
        },
        include: { ...personalInfoIncludes }
      })
      return personalInfo
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async toggleStatus ( id : string, updater : User ) : Promise<PersonalInfo> {
    const currentPersonalInfo = await this.findOne( id )
    try {
      const personalInfo = await this.prismaService.personalInfo.update({
        where: { id },
        data: {
          status: !currentPersonalInfo.status,
          updatedBy: updater.id
        },
        include: { ...personalInfoIncludes }
      })
      return personalInfo
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new InternalServerErrorException( 'Error no esperado, por favor contacte al administrador' )
  }
}
