import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateWorkingInfoDto {
  @IsUUID()
  userId: string

  @IsNotEmpty()
  @IsString()
  profession: string

  @IsUUID()
  professionLevelId: string

  @IsNotEmpty()
  @IsString()
  institutionTitle: string

  @IsNotEmpty()
  @IsString()
  jobAddress: string

  @IsNotEmpty()
  @IsString()
  position: string
}
