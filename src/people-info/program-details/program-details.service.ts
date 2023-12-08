import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateProgramDetailDto, UpdateProgramDetailDto } from './dto'
import { PrismaService } from 'src/prisma'
import { UsersService } from 'src/users/users/users.service'
import { SubparametersService } from 'src/parametric/subparameters/subparameters.service'
import { AdvertisingService } from 'src/advertising/adverstising/advertising.service'
import { ProgramDetail } from './entities/program-detail.entity'
import { User } from 'src/users/users/entities/user.entity'

const programDetailIncludes = {
  user: true,
  howToFindOut: true,
  paymentMethod: true,
  registrationCondition: true,
  creator: true,
  updater: true
}

@Injectable()
export class ProgramDetailsService {

  constructor (
    private readonly prismaService : PrismaService,
    private readonly usersService : UsersService,
    private readonly subparametersService : SubparametersService,
    private readonly advertisingService : AdvertisingService
  ) {}

  async create ( createProgramDetailDto : CreateProgramDetailDto, creator : User ) : Promise<ProgramDetail> {
    const { userId, howToFindOutId, paymentMethodId, registrationConditionId } = createProgramDetailDto
    await this.usersService.findOne( userId )
    await this.advertisingService.findOne( howToFindOutId )
    await this.subparametersService.findOne( paymentMethodId )
    await this.subparametersService.findOne( registrationConditionId )
    try {
      const programDetail = await this.prismaService.programDetail.create({
        data: {
          ...createProgramDetailDto,
          createdBy: creator.id
        },
        include: { ...programDetailIncludes }
      })
      return programDetail
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () : Promise<ProgramDetail[]> {
    const programDetails = await this.prismaService.programDetail.findMany({
      include: { ...programDetailIncludes }
    })
    return programDetails
  }

  async findOne ( id : string ) : Promise<ProgramDetail> {
    const programDetail = await this.prismaService.programDetail.findUnique({
      where: { id },
      include: { ...programDetailIncludes }
    })
    if ( !programDetail ) throw new NotFoundException( 'No se encontró el detalle del programa' )
    return programDetail
  }

  async findByUser ( userId : string ) : Promise<ProgramDetail> {
    const programDetail = await this.prismaService.programDetail.findFirst({
      where: { userId },
      include: { ...programDetailIncludes }
    })
    if ( !programDetail ) throw new NotFoundException( 'No se encontró el detalle del programa para el usuario' )
    return programDetail
  }

  async update ( id : string, updateProgramDetailDto : UpdateProgramDetailDto, updater : User ) : Promise<ProgramDetail> {
    await this.findOne( id )
    const { userId, howToFindOutId, paymentMethodId, registrationConditionId } = updateProgramDetailDto
    if ( userId ) await this.usersService.findOne( userId )
    if ( howToFindOutId ) await this.advertisingService.findOne( howToFindOutId )
    if ( paymentMethodId ) await this.subparametersService.findOne( paymentMethodId )
    if ( registrationConditionId ) await this.subparametersService.findOne( registrationConditionId )
    try {
      const programDetail = await this.prismaService.programDetail.update({
        where: { id },
        data: {
          ...updateProgramDetailDto,
          updatedBy: updater.id
        },
        include: { ...programDetailIncludes }
      })
      return programDetail
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async toggleStatus ( id : string, updater : User ) {
    const programDetail = await this.findOne( id )
    try {
      await this.prismaService.programDetail.update({
        where: { id },
        data: {
          status: !programDetail.status,
          updatedBy: updater.id
        }
      })
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new InternalServerErrorException( 'Error no esperado, por favor contacte al administrador' )
  }
}
