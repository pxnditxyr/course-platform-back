import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreatePersonalInfoDto {
  @IsUUID()
  userId: string
  
  @IsUUID()
  ciExtensionId: string

  @IsUUID()
  genderId: string

  @IsDateString()
  birthDate: Date

  @IsNotEmpty()
  @IsString()
  nationality: string
}
