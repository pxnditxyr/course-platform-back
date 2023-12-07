import { IsUUID } from 'class-validator'

export class CreateTakenCourseDto {
  @IsUUID()
  userId: string

  @IsUUID()
  courseId: string
}
