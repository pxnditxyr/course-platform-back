import { Injectable } from '@nestjs/common';
import { CreateWorkingInfoDto } from './dto/create-working-info.dto';
import { UpdateWorkingInfoDto } from './dto/update-working-info.dto';

@Injectable()
export class WorkingInfoService {
  create(createWorkingInfoDto: CreateWorkingInfoDto) {
    return 'This action adds a new workingInfo';
  }

  findAll() {
    return `This action returns all workingInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workingInfo`;
  }

  update(id: number, updateWorkingInfoDto: UpdateWorkingInfoDto) {
    return `This action updates a #${id} workingInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} workingInfo`;
  }
}
