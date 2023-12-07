import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  details: string

  @IsUUID()
  categoryId: string

  @IsNotEmpty()
  @IsString()
  city: string

  @IsNotEmpty()
  @IsString()
  version: string

  @IsNotEmpty()
  @IsDateString()
  startDate: string
  
  @IsNotEmpty()
  @IsDateString()
  endDate: string
}
