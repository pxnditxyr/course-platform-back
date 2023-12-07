import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateSubparameterDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  details: string

  @IsUUID()
  parameterId: string
}
