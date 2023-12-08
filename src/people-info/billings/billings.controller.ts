import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { BillingsService } from './billings.service'
import { CreateBillingDto, UpdateBillingDto } from './dto'
import { Auth, CurrentUser } from 'src/auth/decorators'
import { User } from 'src/users/users/entities/user.entity'
import { Billing } from './entities/billing.entity'

@Controller( 'billings' )
export class BillingsController {
  
  constructor ( private readonly billingsService: BillingsService ) {}

  @Post()
  @Auth()
  async create (
    @Body() createBillingDto : CreateBillingDto,
    @CurrentUser() creator : User
  ) : Promise<Billing> {
    return this.billingsService.create( createBillingDto, creator )
  }

  @Get()
  async findAll () : Promise<Billing[]> {
    return this.billingsService.findAll()
  }

  @Get( ':id' )
  async findOne (
    @Param( 'id', ParseUUIDPipe ) id : string,
  ) : Promise<Billing> {
    return this.billingsService.findOne( id )
  }

  @Get( 'user/:id' )
  async findByUser (
    @Param( 'id', ParseUUIDPipe ) id : string,
  ) : Promise<Billing> {
    return this.billingsService.findByUser( id )
  }

  @Patch( ':id' )
  @Auth()
  async update (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @Body() updateBillingDto: UpdateBillingDto,
    @CurrentUser() updater : User
  ) : Promise<Billing> {
    return this.billingsService.update( id, updateBillingDto, updater )
  }

  @Delete( ':id' )
  @Auth()
  async toggleStatus (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @CurrentUser() updater : User
  ) {
    return this.billingsService.toggleStatus( id, updater )
  }
}
