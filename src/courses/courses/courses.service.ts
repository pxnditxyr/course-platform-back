import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateCourseDto, UpdateCourseDto } from './dto'
import { User } from 'src/users/users/entities/user.entity'
import { Course } from './entities/course.entity'
import { PrismaService } from 'src/prisma'

const coursesIncludes = {
  creator: true,
  updater: true,
  category: true,
  takenCourses: true,
}

@Injectable()
export class CoursesService {

  constructor (
    private readonly prismaService : PrismaService
  ) {}

  async create ( createCourseDto : CreateCourseDto, creator : User ) : Promise<Course> {
    try {
      const course = await this.prismaService.courses.create({
        data: {
          ...createCourseDto,
          createdBy: creator.id,
        },
        include: { ...coursesIncludes },
      })
      return course
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () : Promise<Course[]> {
    const courses = await this.prismaService.courses.findMany({
      include: { ...coursesIncludes },
      orderBy: { createdAt: 'desc' },
    })
    return courses
  }

  async findOne ( id : string ) : Promise<Course> {
    const course = await this.prismaService.courses.findUnique({
      where: { id },
      include: { ...coursesIncludes },
    })
    if ( !course ) throw new NotFoundException( 'El curso que busca no existe' )
    return course
  }

  async update ( id : string, updateCourseDto : UpdateCourseDto, updater : User ) : Promise<Course> {
    await this.findOne( id )
    try {
      const course = await this.prismaService.courses.update({
        where: { id },
        data: {
          ...updateCourseDto,
          updatedBy: updater.id,
        },
        include: { ...coursesIncludes },
      })
      return course
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async toggleStatus ( id : string, updater : User ) : Promise<Course> {
    const currentCourse = await this.findOne( id )
    try {
      const course = await this.prismaService.courses.update({
        where: { id },
        data: {
          status: !currentCourse.status,
          updatedBy: updater.id,
        },
        include: { ...coursesIncludes },
      })
      return course
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    //TODO: Improve this
    if ( error.code === 'P2000' ) throw new BadRequestException( 'Parece que algun campo es demasiado largo' )
    console.error( error )
    throw new InternalServerErrorException( 'Error no esperado, por favor contacte al administrador' )
  }
}
