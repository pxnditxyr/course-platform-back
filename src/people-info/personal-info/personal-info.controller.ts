import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { PersonalInfoService } from './personal-info.service'
import { Auth, CurrentUser } from 'src/auth/decorators'
import { User } from 'src/users/users/entities/user.entity'
import { PersonalInfo } from './entities/personal-info.entity'
import { CreatePersonalInfoDto, UpdatePersonalInfoDto } from './dto'

@Controller( 'personal-info' )
export class PersonalInfoController {
  constructor( private readonly personalInfoService: PersonalInfoService ) {}

  @Post()
  @Auth()
  async create (
    @Body() createPersonalInfoDto : CreatePersonalInfoDto,
    @CurrentUser() creator : User
  ) : Promise<PersonalInfo> {
    return this.personalInfoService.create( createPersonalInfoDto, creator )
  }

  @Get()
  async findAll () : Promise<PersonalInfo[]> {
    return this.personalInfoService.findAll()
  }

  @Get( ':id' )
  async findOne (
    @Param( 'id', ParseUUIDPipe ) id : string
  ) {
    return this.personalInfoService.findOne( id )
  }

  @Get( 'user/:userId' )
  async findByUser(
    @Param( 'userId', ParseUUIDPipe ) userId: string
  ) : Promise<PersonalInfo> {
    return this.personalInfoService.findOneByUser( userId )
  }

  @Patch( ':id' )
  @Auth()
  async update (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @Body() updatePersonalInfoDto : UpdatePersonalInfoDto,
    @CurrentUser() updater : User
  ) : Promise<PersonalInfo> {
    return this.personalInfoService.update( id, updatePersonalInfoDto, updater )
  }

  @Delete( ':id' )
  @Auth()
  async toggleStatus (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @CurrentUser() updater : User
  ) : Promise<PersonalInfo> {
    return this.personalInfoService.toggleStatus( id, updater )
  }
}
