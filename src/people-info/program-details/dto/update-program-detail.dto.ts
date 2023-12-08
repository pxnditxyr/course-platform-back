import { PartialType } from '@nestjs/mapped-types'
import { CreateProgramDetailDto } from './create-program-detail.dto'

export class UpdateProgramDetailDto extends PartialType( CreateProgramDetailDto ) {}
