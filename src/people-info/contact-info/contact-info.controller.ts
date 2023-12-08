import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { ContactInfoService } from './contact-info.service'
import { CreateContactInfoDto, UpdateContactInfoDto } from './dto'
import { Auth, CurrentUser } from 'src/auth/decorators'
import { User } from 'src/users/users/entities/user.entity'
import { ContactInfo } from './entities/contact-info.entity'

@Controller( 'contact-info' )
export class ContactInfoController {
  constructor( private readonly contactInfoService : ContactInfoService ) {}

  @Post()
  @Auth()
  async create (
    @Body() createContactInfoDto : CreateContactInfoDto,
    @CurrentUser() creator : User
  ) : Promise<ContactInfo> {
    return this.contactInfoService.create( createContactInfoDto, creator )
  }

  @Get()
  async findAll () : Promise<ContactInfo[]> {
    return this.contactInfoService.findAll()
  }

  @Get( ':id' )
  async findOne (
    @Param( 'id', ParseUUIDPipe ) id : string
  ) : Promise<ContactInfo> {
    return this.contactInfoService.findOne( id )
  }

  @Get( 'user/:userId' )
  async findByUserId (
    @Param( 'userId', ParseUUIDPipe ) userId : string
  ) : Promise<ContactInfo> {
    return this.contactInfoService.findByUserId( userId )
  }

  @Patch( ':id' )
  @Auth()
  async update (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @Body() updateContactInfoDto : UpdateContactInfoDto,
    @CurrentUser() updater : User
  ) : Promise<ContactInfo> {
    return this.contactInfoService.update( id, updateContactInfoDto, updater )
  }

  @Delete( ':id' )
  @Auth()
  async toggleStatus (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @CurrentUser() updater : User
  ) {
    return this.contactInfoService.toggleStatus( id, updater )
  }
}
