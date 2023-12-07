import { PartialType } from '@nestjs/mapped-types'
import { CreateCategoryDto } from './create-category.dto'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateCategoryDto extends PartialType( CreateCategoryDto ) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  imageUrl?: string
}
