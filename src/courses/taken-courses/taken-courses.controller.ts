import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TakenCoursesService } from './taken-courses.service';
import { CreateTakenCourseDto } from './dto/create-taken-course.dto';
import { UpdateTakenCourseDto } from './dto/update-taken-course.dto';

@Controller('taken-courses')
export class TakenCoursesController {
  constructor(private readonly takenCoursesService: TakenCoursesService) {}

  @Post()
  create(@Body() createTakenCourseDto: CreateTakenCourseDto) {
    return this.takenCoursesService.create(createTakenCourseDto);
  }

  @Get()
  findAll() {
    return this.takenCoursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.takenCoursesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTakenCourseDto: UpdateTakenCourseDto) {
    return this.takenCoursesService.update(+id, updateTakenCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.takenCoursesService.remove(+id);
  }
}
