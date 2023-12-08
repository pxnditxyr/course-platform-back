import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateBillingDto, UpdateBillingDto } from './dto'
import { PrismaService } from 'src/prisma'
import { User } from 'src/users/users/entities/user.entity'
import { Billing } from './entities/billing.entity'
import { UsersService } from 'src/users/users/users.service'

const billingIncludes = {
  creator: true,
  updater: true,
  user: true
}

@Injectable()
export class BillingsService {

  constructor (
    private readonly prismaService : PrismaService,
    private readonly usersService : UsersService
  ) {}
  
  async create( createBillingDto : CreateBillingDto, creator : User ) : Promise<Billing> {
    const { userId } = createBillingDto
    await this.usersService.findOne( userId )
    try {
      const billing = await this.prismaService.billing.create({
        data: {
          ...createBillingDto,
          createdBy: creator.id
        },
        include: { ...billingIncludes }
      })
      return billing
    } catch ( error ) {
      throw error
    }
  }

  async findAll () {
    const billings = await this.prismaService.billing.findMany({
      include: { ...billingIncludes }
    })
    return billings
  }

  async findOne ( id : string ) : Promise<Billing> {
    const billing = await this.prismaService.billing.findUnique({
      where: { id },
      include: { ...billingIncludes }
    })
    if ( !billing ) throw new NotFoundException( 'No se encontró el registro de facturación' )
    return billing
  }

  async findByUser ( userId : string ) : Promise<Billing> {
    const billing = await this.prismaService.billing.findFirst({
      where: { userId },
      include: { ...billingIncludes }
    })
    if ( !billing ) throw new NotFoundException( 'No se encontró el registro de facturación del usuario' )
    return billing
  }

  async update ( id : string, updateBillingDto : UpdateBillingDto, updater : User ) : Promise<Billing> {
    await this.findOne( id )
    const { userId } = updateBillingDto
    if ( userId ) await this.usersService.findOne( userId )
    try {
      const billing = await this.prismaService.billing.update({
        where: { id },
        data: {
          ...updateBillingDto,
          updatedBy: updater.id
        },
        include: { ...billingIncludes }
      })
      return billing
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async toggleStatus ( id : string, updater : User ) : Promise<Billing> {
    const currentBilling = await this.findOne( id )
    try {
      const billing = await this.prismaService.billing.update({
        where: { id },
        data: {
          status: !currentBilling.status,
          updatedBy: updater.id
        },
        include: { ...billingIncludes }
      })
      return billing
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new InternalServerErrorException( 'Error no esperado, por favor contacte al administrador' )
  }
}
