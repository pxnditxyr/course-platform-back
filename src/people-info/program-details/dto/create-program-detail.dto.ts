import { IsUUID } from 'class-validator'

export class CreateProgramDetailDto {
  @IsUUID()
  userId: string

  @IsUUID()
  paymentMethodId: string

  @IsUUID()
  registrationConditionId: string

  @IsUUID()
  howToFindOutId: string
}
