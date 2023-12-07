import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { SubparametersService } from './subparameters.service'
import { CreateSubparameterDto, UpdateSubparameterDto } from './dto'
import { Auth, CurrentUser } from 'src/auth/decorators'
import { User } from 'src/users/users/entities/user.entity'
import { Subparameter } from './entities/subparameter.entity'

@Controller( 'subparameters' )
export class SubparametersController {

  constructor( private readonly subparametersService: SubparametersService ) {}

  @Post()
  @Auth()
  async create (
    @Body() createSubparameterDto : CreateSubparameterDto,
    @CurrentUser() creator : User
  ) : Promise<Subparameter> {
    return this.subparametersService.create( createSubparameterDto, creator )
  }

  @Get()
  async findAll () : Promise<Subparameter[]> {
    return this.subparametersService.findAll()
  }

  @Get( ':id' )
  async findOne (
    @Param( 'id', ParseUUIDPipe ) id : string
  ) : Promise<Subparameter> {
    return this.subparametersService.findOne( id )
  }

  @Patch( ':id' )
  @Auth()
  async update (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @Body() updateSubparameterDto: UpdateSubparameterDto,
    @CurrentUser() updater : User
  ) : Promise<Subparameter> {
    return this.subparametersService.update( id, updateSubparameterDto, updater )
  }

  @Delete( ':id' )
  @Auth()
  async toggleStatus (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @CurrentUser() updater : User
  ) : Promise<Subparameter> {
    return this.subparametersService.toggleStatus( id, updater )
  }
}
