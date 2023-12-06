import { Injectable } from '@nestjs/common';
import { CreateSubparameterDto } from './dto/create-subparameter.dto';
import { UpdateSubparameterDto } from './dto/update-subparameter.dto';

@Injectable()
export class SubparametersService {
  create(createSubparameterDto: CreateSubparameterDto) {
    return 'This action adds a new subparameter';
  }

  findAll() {
    return `This action returns all subparameters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subparameter`;
  }

  update(id: number, updateSubparameterDto: UpdateSubparameterDto) {
    return `This action updates a #${id} subparameter`;
  }

  remove(id: number) {
    return `This action removes a #${id} subparameter`;
  }
}
