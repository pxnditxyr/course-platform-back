import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateParameterDto, UpdateParameterDto } from './dto'
import { PrismaService } from 'src/prisma'
import { Parameter } from './entities/parameter.entity'
import { User } from 'src/users/users/entities/user.entity'
import { extractPrismaExceptions } from 'src/utils'

const parametersIncludes = {
  creator: true,
  updater: true,
  subparameters: true
}

@Injectable()
export class ParametersService {

  constructor (
    private readonly prismaService : PrismaService
  ) {}

  async create ( createParameterDto : CreateParameterDto, creator : User ) : Promise<Parameter> {
    try {
      const parameter = await this.prismaService.parameters.create({
        data: {
          ...createParameterDto,
          createdBy: creator.id,
        },
        include: { ...parametersIncludes }
      })
      return parameter
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () : Promise<Parameter[]> {
    const parameters = await this.prismaService.parameters.findMany({
      include: { ...parametersIncludes }
    })
    return parameters
  }

  async findOne ( id : string ) : Promise<Parameter> {
    const parameter = await this.prismaService.parameters.findUnique({
      where: { id },
      include: { ...parametersIncludes }
    })
    if ( !parameter ) throw new NotFoundException( 'El parámetro no existe' )
    return parameter
  }

  async findOneByName ( name : string ) : Promise<Parameter> {
    const parameter = await this.prismaService.parameters.findUnique({
      where: { name },
      include: { ...parametersIncludes }
    })
    if ( !parameter ) throw new NotFoundException( 'El parámetro no existe' )
    return parameter
  }

  async update ( id : string, updateParameterDto : UpdateParameterDto, updater : User ) : Promise<Parameter> {
    await this.findOne( id )
    try {
      const parameter = await this.prismaService.parameters.update({
        where: { id },
        data: {
          ...updateParameterDto,
          updatedBy: updater.id
        },
        include: { ...parametersIncludes }
      })
      return parameter
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async toggleStatus ( id : string, updater : User ) : Promise<Parameter> {
    const currentParameter = await this.findOne( id )
    try {
      const parameter = await this.prismaService.parameters.update({
        where: { id },
        data: {
          status: !currentParameter.status,
          updatedBy: updater.id
        },
        include: { ...parametersIncludes }
      })
      return parameter
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    const prismaError = extractPrismaExceptions( error )
    if ( prismaError ) throw new BadRequestException( prismaError )
    throw new InternalServerErrorException( 'Error no esperado, por favor contacte al administrador' )
  }
}
