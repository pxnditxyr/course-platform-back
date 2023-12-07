import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma'
import { TakenCourse } from './entities/taken-course.entity'
import { User } from 'src/users/users/entities/user.entity'
import { CreateTakenCourseDto, UpdateTakenCourseDto } from './dto'

const takenCoursesInclude = {
  user: true,
  course: true,
  creator: true,
  updater: true
}

@Injectable()
export class TakenCoursesService {

  constructor (
    private readonly prismaService: PrismaService,
  ) {}

  async create ( createTakenCourseDto : CreateTakenCourseDto, creator : User ) : Promise<TakenCourse> {
    try {
      const takenCourse = await this.prismaService.takenCourses.create({
        data: {
          ...createTakenCourseDto,
          createdBy: creator.id
        },
        include: { ...takenCoursesInclude }
      })
      return takenCourse
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () : Promise<TakenCourse[]> {
    const takenCourses = await this.prismaService.takenCourses.findMany({
      include: { ...takenCoursesInclude }
    })
    return takenCourses
  }

  async findOne ( id : string ) : Promise<TakenCourse> {
    const takenCourse = await this.prismaService.takenCourses.findUnique({
      where: { id },
      include: { ...takenCoursesInclude }
    })
    if ( !takenCourse ) throw new NotFoundException( 'El curso tomado no existe o no se encuentra disponible' )
    return takenCourse
  }

  async update (
    id : string,
    updateTakenCourseDto : UpdateTakenCourseDto,
    updater : User
  ) {
    await this.findOne( id )
    try {
      const takenCourse = await this.prismaService.takenCourses.update({
        where: { id },
        data: {
          ...updateTakenCourseDto,
          updatedBy: updater.id
        },
        include: { ...takenCoursesInclude }
      })
      return takenCourse
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async toggleStatus ( id : string, updater : User ) : Promise<TakenCourse> {
    const currentTakenCourse = await this.findOne( id )
    try {
      const takenCourse = await this.prismaService.takenCourses.update({
        where: { id },
        data: {
          status: !currentTakenCourse.status,
          updatedBy: updater.id
        },
        include: { ...takenCoursesInclude }
      })
      return takenCourse
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }


  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new InternalServerErrorException( 'Error no esperado, por favor contacte al administrador' )
  }
}
