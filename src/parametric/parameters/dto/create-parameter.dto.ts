import { IsNotEmpty, IsString } from 'class-validator'

export class CreateParameterDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  details: string
}
