import { PartialType } from '@nestjs/mapped-types'
import { CreateWorkingInfoDto } from './create-working-info.dto'

export class UpdateWorkingInfoDto extends PartialType( CreateWorkingInfoDto ) {}
