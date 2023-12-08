import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class CreateDocumentDto {
  @IsUUID()
  userId: string

  @IsNotEmpty()
  @IsString()
  url: string

  @IsUUID()
  documentTypeId: string
}
