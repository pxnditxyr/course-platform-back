import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { ProgramDetailsService } from './program-details.service'
import { CreateProgramDetailDto, UpdateProgramDetailDto } from './dto'
import { ProgramDetail } from './entities/program-detail.entity'
import { Auth, CurrentUser } from 'src/auth/decorators'
import { User } from 'src/users/users/entities/user.entity'

@Controller( 'program-details' )
export class ProgramDetailsController {

  constructor ( private readonly programDetailsService: ProgramDetailsService ) {}

  @Post()
  @Auth()
  async create (
    @Body() createProgramDetailDto : CreateProgramDetailDto,
    @CurrentUser() creator : User
  ) : Promise<ProgramDetail> {
    return this.programDetailsService.create( createProgramDetailDto, creator )
  }

  @Get()
  async findAll () : Promise<ProgramDetail[]> {
    return this.programDetailsService.findAll()
  }

  @Get( ':id' )
  async findOne ( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<ProgramDetail> {
    return this.programDetailsService.findOne( id )
  }

  @Get( 'user/:userId' )
  async findByUser ( @Param( 'userId', ParseUUIDPipe ) id : string ) : Promise<ProgramDetail> {
    return this.programDetailsService.findByUser( id )
  }

  @Patch( ':id' )
  @Auth()
  async update (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @Body() updateProgramDetailDto: UpdateProgramDetailDto,
    @CurrentUser() updater : User
  ) : Promise<ProgramDetail> {
    return this.programDetailsService.update( id, updateProgramDetailDto, updater )
  }

  @Delete( ':id' )
  @Auth()
  async toggleStatus (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @CurrentUser() updater : User
  ) {
    return this.programDetailsService.toggleStatus( id, updater )
  }
}
