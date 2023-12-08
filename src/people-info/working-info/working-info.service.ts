import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateWorkingInfoDto, UpdateWorkingInfoDto } from './dto'
import { PrismaService } from 'src/prisma'
import { UsersService } from 'src/users/users/users.service'
import { SubparametersService } from 'src/parametric/subparameters/subparameters.service'
import { User } from 'src/users/users/entities/user.entity'
import { WorkingInfo } from './entities/working-info.entity'

const workingInfoInclude = {
  user: true,
  creator: true,
  updater: true,
  professionLevel: true,
}

@Injectable()
export class WorkingInfoService {

  constructor (
    private readonly prismaService : PrismaService,
    private readonly usersService : UsersService,
    private readonly subparametersService : SubparametersService
  ) {}

  async create ( createWorkingInfoDto : CreateWorkingInfoDto, creator : User ) : Promise<WorkingInfo> {
    const { userId, professionLevelId } = createWorkingInfoDto
    await this.usersService.findOne( userId )
    await this.subparametersService.findOne( professionLevelId )
    try {
      const workingInfo = await this.prismaService.workingInfo.create({
        data: {
          ...createWorkingInfoDto,
          createdBy: creator.id
        },
        include: { ...workingInfoInclude }
      })
      return workingInfo
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () : Promise<WorkingInfo[]> {
    const workingInfos = await this.prismaService.workingInfo.findMany({
      include: { ...workingInfoInclude }
    })
    return workingInfos
  }

  async findOne ( id : string ) : Promise<WorkingInfo> {
    const workingInfo = await this.prismaService.workingInfo.findUnique({
      where: { id },
      include: { ...workingInfoInclude }
    })
    if ( !workingInfo ) throw new NotFoundException( 'No se encontró el registro de información laboral' )
    return workingInfo
  }

  async findOneByUser ( userId : string ) : Promise<WorkingInfo> {
    const workingInfo = await this.prismaService.workingInfo.findFirst({
      where: { userId },
      include: { ...workingInfoInclude }
    })
    if ( !workingInfo ) throw new NotFoundException( 'No se encontró el registro de información laboral del usuario' )
    return workingInfo
  }

  async update ( id : string, updateWorkingInfoDto : UpdateWorkingInfoDto, updater : User ) : Promise<WorkingInfo> {
    await this.findOne( id )
    const { userId, professionLevelId } = updateWorkingInfoDto
    if ( userId ) await this.usersService.findOne( userId )
    if ( professionLevelId ) await this.subparametersService.findOne( professionLevelId )
    try {
      const workingInfo = await this.prismaService.workingInfo.update({
        where: { id },
        data: {
          ...updateWorkingInfoDto,
          updatedBy: updater.id
        },
        include: { ...workingInfoInclude }
      })
      return workingInfo
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async toggleStatus ( id : string, updater : User ) : Promise<WorkingInfo> {
    const currentWorkingInfo = await this.findOne( id )
    try {
      const workingInfo = await this.prismaService.workingInfo.update({
        where: { id },
        data: {
          status: !currentWorkingInfo.status,
          updatedBy: updater.id
        },
        include: { ...workingInfoInclude }
      })
      return workingInfo
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new InternalServerErrorException( 'Error no esperado, por favor contacte al administrador' )
  }
}
