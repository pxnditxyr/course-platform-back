import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateSubparameterDto } from './dto/create-subparameter.dto'
import { UpdateSubparameterDto } from './dto/update-subparameter.dto'
import { User } from 'src/users/users/entities/user.entity'
import { Subparameter } from './entities/subparameter.entity'
import { PrismaService } from 'src/prisma'

const subparametersIncludes = {
  creator: true,
  updater: true,
  parameter: true
}

@Injectable()
export class SubparametersService {

  constructor (
    private readonly prismaService : PrismaService
  ) {}

  async create ( createSubparameterDto : CreateSubparameterDto, creator : User ) : Promise<Subparameter> {
    try {
      const subparameter = await this.prismaService.subparameters.create({
        data: {
          ...createSubparameterDto,
          createdBy: creator.id,
        },
        include: { ...subparametersIncludes }
      })
      return subparameter
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () : Promise<Subparameter[]> {
    const subparameters = await this.prismaService.subparameters.findMany({
      include: { ...subparametersIncludes }
    })
    return subparameters
  }

  async findOne ( id : string ) : Promise<Subparameter> {
    const subparameter = await this.prismaService.subparameters.findUnique({
      where: { id },
      include: { ...subparametersIncludes }
    })
    if ( !subparameter ) throw new NotFoundException( 'El subparámetro no existe' )
    return subparameter
  }

  async update ( id : string, updateSubparameterDto : UpdateSubparameterDto, updater : User ) : Promise<Subparameter> {
    await this.findOne( id )
    try {
      const subparameter = await this.prismaService.subparameters.update({
        where: { id },
        data: {
          ...updateSubparameterDto,
          updatedBy: updater.id
        },
        include: { ...subparametersIncludes }
      })
      return subparameter
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async toggleStatus ( id : string, updater : User ) : Promise<Subparameter> {
    const currentSubparameter = await this.findOne( id )
    try {
      const subparameter = await this.prismaService.subparameters.update({
        where: { id },
        data: {
          status: !currentSubparameter.status,
          updatedBy: updater.id
        },
        include: { ...subparametersIncludes }
      })
      return subparameter
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new InternalServerErrorException( 'Error no esperado, por favor contacte al administrador' )
  }
}
