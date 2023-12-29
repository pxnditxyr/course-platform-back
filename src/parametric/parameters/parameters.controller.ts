import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { ParametersService } from './parameters.service'
import { CreateParameterDto } from './dto/create-parameter.dto'
import { UpdateParameterDto } from './dto/update-parameter.dto'
import { Auth, CurrentUser } from 'src/auth/decorators'
import { User } from 'src/users/users/entities/user.entity'
import { Parameter } from './entities/parameter.entity'

@Controller( 'parameters' )
export class ParametersController {

  constructor( private readonly parametersService : ParametersService ) {}

  @Post()
  @Auth()
  async create (
    @Body() createParameterDto : CreateParameterDto,
    @CurrentUser() creator : User
  ) : Promise<Parameter> {
    return this.parametersService.create( createParameterDto, creator )
  }

  @Get()
  async findAll () : Promise<Parameter[]> {
    return this.parametersService.findAll()
  }

  @Get( ':id' )
  async findOne (
    @Param( 'id', ParseUUIDPipe ) id : string
  ) : Promise<Parameter> {
    return this.parametersService.findOne( id )
  }

  @Get( 'name/:name' )
  async findOneByName (
    @Param( 'name' ) name : string
  ) : Promise<Parameter> {
    return this.parametersService.findOneByName( name )
  }

  @Patch( ':id' )
  @Auth()
  async update (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @Body() updateParameterDto : UpdateParameterDto,
    @CurrentUser() updater : User
  ) : Promise<Parameter> {
    return this.parametersService.update( id, updateParameterDto, updater )
  }

  @Delete( ':id' )
  @Auth()
  async toggleStatus (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @CurrentUser() updater : User
  ) : Promise<Parameter> {
    return this.parametersService.toggleStatus( id, updater )
  }
}
