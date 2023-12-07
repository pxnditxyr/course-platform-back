import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator'
import { ValidRoles } from 'src/auth'

export class CreateUserDto {
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  paternalSurname: string

  @IsNotEmpty()
  @IsString()
  maternalSurname: string

  @IsIn( Object.values( ValidRoles ) )
  role: ValidRoles
}
