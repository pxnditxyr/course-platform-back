import { PartialType } from '@nestjs/mapped-types'
import { CreateTakenCourseDto } from './create-taken-course.dto'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateTakenCourseDto extends PartialType( CreateTakenCourseDto ) {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  imageUrl?: string
}
