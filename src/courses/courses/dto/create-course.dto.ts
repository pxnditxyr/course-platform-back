import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  details: string

  @IsUUID()
  categoryId: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  imageUrl: string

  @IsNotEmpty()
  @IsString()
  city: string

  @IsNotEmpty()
  @IsString()
  version: string

  @IsDateString()
  startDate: string
  
  @IsDateString()
  endDate: string
}
