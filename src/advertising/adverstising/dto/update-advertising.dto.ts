import { PartialType } from '@nestjs/mapped-types'
import { CreateAdvertisingDto } from './create-advertising.dto'

export class UpdateAdvertisingDto extends PartialType( CreateAdvertisingDto ) {}
