import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { WorkingInfoService } from './working-info.service'
import { CreateWorkingInfoDto, UpdateWorkingInfoDto } from './dto'
import { WorkingInfo } from './entities/working-info.entity'
import { Auth, CurrentUser } from 'src/auth/decorators'
import { User } from 'src/users/users/entities/user.entity'

@Controller( 'working-info' )
export class WorkingInfoController {

  constructor( private readonly workingInfoService: WorkingInfoService ) {}

  @Post()
  @Auth()
  async create (
    @Body() createWorkingInfoDto : CreateWorkingInfoDto,
    @CurrentUser() creator : User
  ) : Promise<WorkingInfo> {
    return this.workingInfoService.create( createWorkingInfoDto, creator )
  }

  @Get()
  async findAll () : Promise<WorkingInfo[]> {
    return this.workingInfoService.findAll()
  }

  @Get( ':id' )
  async findOne ( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<WorkingInfo> {
    return this.workingInfoService.findOne( id )
  }

  @Get( 'user/:userId' )
  async findOneByUser ( @Param( 'userId', ParseUUIDPipe ) userId : string ) : Promise<WorkingInfo> {
    return this.workingInfoService.findOneByUser( userId )
  }

  @Patch( ':id' )
  @Auth()
  async update (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @Body() updateWorkingInfoDto : UpdateWorkingInfoDto,
    @CurrentUser() updater : User
  ) : Promise<WorkingInfo> {
    return this.workingInfoService.update( id, updateWorkingInfoDto, updater )
  }

  @Delete( ':id' )
  async toggleStatus (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @CurrentUser() updater : User
  ) {
    return this.workingInfoService.toggleStatus( id, updater )
  }
}
