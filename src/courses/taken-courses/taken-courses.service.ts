import { Injectable } from '@nestjs/common';
import { CreateTakenCourseDto } from './dto/create-taken-course.dto';
import { UpdateTakenCourseDto } from './dto/update-taken-course.dto';

@Injectable()
export class TakenCoursesService {
  create(createTakenCourseDto: CreateTakenCourseDto) {
    return 'This action adds a new takenCourse';
  }

  findAll() {
    return `This action returns all takenCourses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} takenCourse`;
  }

  update(id: number, updateTakenCourseDto: UpdateTakenCourseDto) {
    return `This action updates a #${id} takenCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} takenCourse`;
  }
}
