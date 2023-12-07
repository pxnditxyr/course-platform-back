import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto, UpdateUserDto } from './dto'
import { User } from './entities/user.entity'
import { Auth, CurrentUser } from 'src/auth/decorators'
import { ValidRoles } from 'src/auth'

@Controller( 'users' )
export class UsersController {

  constructor( private readonly usersService: UsersService ) {}

  @Post()
  @Auth( ValidRoles.ADMIN )
  async create (
    @Body() createUserDto : CreateUserDto,
    @CurrentUser() creator : User
  ) : Promise<User> {
    return this.usersService.create( createUserDto, creator )
  }

  @Get()
  async findAll () : Promise<User[]> {
    return this.usersService.findAll()
  }

  @Get( ':id' )
  async findOne (
    @Param( 'id', ParseUUIDPipe ) id : string
  ) {
    return this.usersService.findOne( id )
  }

  @Patch( ':id' )
  @Auth()
  async update (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @Body() updateUserDto : UpdateUserDto,
    @CurrentUser() updater : User
  ) : Promise<User> {
    return this.usersService.update( id, updateUserDto, updater )
  }

  @Auth()
  @Delete( ':id' )
  async toggleStatus (
    @Param( 'id' ) id : string,
    @CurrentUser() updater : User
  ) : Promise<User> {
    return this.usersService.toggleStatus( id, updater )
  }
}
