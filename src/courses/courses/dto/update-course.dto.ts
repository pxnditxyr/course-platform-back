import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCourseDto extends PartialType( CreateCourseDto ) {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  imageUrl?: string
}
