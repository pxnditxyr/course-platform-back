import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateBillingDto {
  @IsUUID()
  userId: string

  @IsNotEmpty()
  @IsString()
  nit: string

  @IsNotEmpty()
  @IsString()
  reason: string
}
