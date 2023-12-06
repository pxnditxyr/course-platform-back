import { PartialType } from '@nestjs/mapped-types';
import { CreateSubparameterDto } from './create-subparameter.dto';

export class UpdateSubparameterDto extends PartialType(CreateSubparameterDto) {}
