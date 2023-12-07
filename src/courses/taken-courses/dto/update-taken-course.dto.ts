import { PartialType } from '@nestjs/mapped-types';
import { CreateTakenCourseDto } from './create-taken-course.dto';

export class UpdateTakenCourseDto extends PartialType(CreateTakenCourseDto) {}
