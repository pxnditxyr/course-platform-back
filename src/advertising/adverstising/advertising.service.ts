import { Injectable } from '@nestjs/common';
import { CreateAdvertisingDto } from './dto/create-advertising.dto';
import { UpdateAdvertisingDto } from './dto/update-advertising.dto';

@Injectable()
export class AdvertisingService {
  create(createAdvertisingDto: CreateAdvertisingDto) {
    return 'This action adds a new advertising';
  }

  findAll() {
    return `This action returns all advertising`;
  }

  findOne(id: number) {
    return `This action returns a #${id} advertising`;
  }

  update(id: number, updateAdvertisingDto: UpdateAdvertisingDto) {
    return `This action updates a #${id} advertising`;
  }

  remove(id: number) {
    return `This action removes a #${id} advertising`;
  }
}
