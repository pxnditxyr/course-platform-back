import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { TakenCoursesService } from './taken-courses.service'
import { CreateTakenCourseDto, UpdateTakenCourseDto } from './dto'
import { Auth, CurrentUser } from 'src/auth/decorators'
import { User } from 'src/users/users/entities/user.entity'
import { TakenCourse } from './entities/taken-course.entity'

@Controller( 'taken-courses' )
export class TakenCoursesController {
  constructor ( private readonly takenCoursesService : TakenCoursesService ) {}

  @Post()
  @Auth()
  async create (
    @Body() createTakenCourseDto : CreateTakenCourseDto,
    @CurrentUser() creator : User
  ) : Promise<TakenCourse> {
    return this.takenCoursesService.create( createTakenCourseDto, creator )
  }

  @Get()
  async findAll () : Promise<TakenCourse[]> {
    return this.takenCoursesService.findAll()
  }

  @Get( ':id' )
  async findOne (
    @Param( 'id', ParseUUIDPipe ) id : string
  ) : Promise<TakenCourse> {
    return this.takenCoursesService.findOne( id )
  }

  @Patch( ':id' )
  @Auth()
  async update (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @Body() updateTakenCourseDto : UpdateTakenCourseDto,
    @CurrentUser() updater : User
  ) {
    return this.takenCoursesService.update( id, updateTakenCourseDto, updater )
  }

  @Delete( ':id' )
  @Auth()
  async toggleStatus (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @CurrentUser() updater : User
  ) : Promise<TakenCourse> {
    return this.takenCoursesService.toggleStatus( id, updater )
  }
}
