import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateAdvertisingDto } from './dto/create-advertising.dto'
import { UpdateAdvertisingDto } from './dto/update-advertising.dto'
import { PrismaService } from 'src/prisma'
import { User } from 'src/users/users/entities/user.entity'
import { Advertising } from './entities/advertising.entity'

const advertisingIncludes = {
  creator: true,
  updater: true,
  howToFindOut: true,
}

@Injectable()
export class AdvertisingService {

  constructor (
    private readonly prismaService : PrismaService
  ) {}

  async create (
    createAdvertisingDto : CreateAdvertisingDto,
    creator : User
  ) : Promise<Advertising> {
    try {
      const advertising = await this.prismaService.advertising.create({
        data: {
          ...createAdvertisingDto,
          createdBy: creator.id
        },
        include: { ...advertisingIncludes }
      })
      return advertising
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () : Promise<Advertising[]> {
    const advertisings = await this.prismaService.advertising.findMany({
      include: { ...advertisingIncludes }
    })
    return advertisings
  }

  async findOne ( id : string ) : Promise<Advertising> {
    const advertising = await this.prismaService.advertising.findUnique({
      where: { id },
      include: { ...advertisingIncludes }
    })
    if ( !advertising ) throw new NotFoundException( 'No se encontró el registro de publicidad' )
    return advertising
  }

  async update( id: string, updateAdvertisingDto : UpdateAdvertisingDto, updater : User ) : Promise<Advertising> {
    await this.findOne( id )
    try {
      const advertising = await this.prismaService.advertising.update({
        where: { id },
        data: {
          ...updateAdvertisingDto,
          updatedBy: updater.id
        },
        include: { ...advertisingIncludes }
      })
      return advertising
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async toggleStatus ( id : string, updater : User ) : Promise<Advertising> {
    const currentAdvertising = await this.findOne( id )
    try {
      const advertising = await this.prismaService.advertising.update({
        where: { id },
        data: {
          status: !currentAdvertising.status,
          updatedBy: updater.id
        },
        include: { ...advertisingIncludes }
      })
      return advertising
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new InternalServerErrorException( 'Error no esperado, por favor contacte al administrador' )
  }
}
