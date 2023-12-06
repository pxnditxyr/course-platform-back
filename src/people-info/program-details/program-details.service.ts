import { Injectable } from '@nestjs/common';
import { CreateProgramDetailDto } from './dto/create-program-detail.dto';
import { UpdateProgramDetailDto } from './dto/update-program-detail.dto';

@Injectable()
export class ProgramDetailsService {
  create(createProgramDetailDto: CreateProgramDetailDto) {
    return 'This action adds a new programDetail';
  }

  findAll() {
    return `This action returns all programDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} programDetail`;
  }

  update(id: number, updateProgramDetailDto: UpdateProgramDetailDto) {
    return `This action updates a #${id} programDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} programDetail`;
  }
}
