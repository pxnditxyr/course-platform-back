import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { AdvertisingService } from './advertising.service'
import { CreateAdvertisingDto, UpdateAdvertisingDto } from './dto'
import { Auth, CurrentUser } from 'src/auth/decorators'
import { User } from 'src/users/users/entities/user.entity'
import { Advertising } from './entities/advertising.entity'

@Controller( 'advertising' )
export class AdvertisingController {

  constructor (
    private readonly advertisingService : AdvertisingService
  ) {}

  @Post()
  @Auth()
  async create (
    @Body() createAdvertisingDto : CreateAdvertisingDto,
    @CurrentUser() creator : User
  ) : Promise<Advertising> {
    return this.advertisingService.create( createAdvertisingDto, creator )
  }

  @Get()
  async findAll () : Promise<Advertising[]> {
    return this.advertisingService.findAll()
  }

  @Get( ':id' )
  async findOne (
    @Param( 'id', ParseUUIDPipe ) id : string
  ) : Promise<Advertising> {
    return this.advertisingService.findOne( id )
  }

  @Patch( ':id' )
  @Auth()
  async update (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @Body() updateAdvertisingDto : UpdateAdvertisingDto,
    @CurrentUser() updater : User
  ) : Promise<Advertising> {
    return this.advertisingService.update( id, updateAdvertisingDto, updater )
  }

  @Delete( ':id' )
  @Auth()
  async toggleStatus (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @CurrentUser() updater : User
  ) : Promise<Advertising> {
    return this.advertisingService.toggleStatus( id, updater )
  }
}
