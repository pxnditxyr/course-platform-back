import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateContactInfoDto {
  @IsUUID()
  userId: string
  
  @IsNotEmpty()
  @IsString()
  phone: string

  @IsNotEmpty()
  @IsString()
  landline: string

  @IsNotEmpty()
  @IsString()
  department: string

  @IsNotEmpty()
  @IsString()
  city: string

  @IsNotEmpty()
  @IsString()
  address: string
}
