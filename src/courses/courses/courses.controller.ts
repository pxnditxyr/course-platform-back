import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { CoursesService } from './courses.service'
import { CreateCourseDto, UpdateCourseDto } from './dto'
import { Auth, CurrentUser } from 'src/auth/decorators'
import { User } from 'src/users/users/entities/user.entity'
import { Course } from './entities/course.entity'

@Controller( 'courses' )
export class CoursesController {
  constructor ( private readonly coursesService: CoursesService ) {}

  @Post()
  @Auth()
  async create (
    @Body() createCourseDto : CreateCourseDto,
    @CurrentUser() creator : User
  ) : Promise<Course> {
    return this.coursesService.create( createCourseDto, creator )
  }

  @Get()
  async findAll () : Promise<Course[]> {
    return this.coursesService.findAll()
  }

  @Get( ':id' )
  async findOne ( @Param( 'id', ParseUUIDPipe ) id : string ) : Promise<Course> {
    return this.coursesService.findOne( id )
  }

  @Patch( ':id' )
  @Auth()
  async update (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @Body() updateCourseDto : UpdateCourseDto,
    @CurrentUser() updater : User
  ) : Promise<Course> {
    return this.coursesService.update( id, updateCourseDto, updater )
  }

  @Delete( ':id' )
  @Auth()
  async toggleStatus (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @CurrentUser() updater : User
  ) : Promise<Course> {
    return this.coursesService.toggleStatus( id, updater )
  }
}
