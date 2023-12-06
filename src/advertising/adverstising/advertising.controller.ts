import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdvertisingService } from './advertising.service';
import { CreateAdvertisingDto } from './dto/create-advertising.dto';
import { UpdateAdvertisingDto } from './dto/update-advertising.dto';

@Controller('advertising')
export class AdvertisingController {
  constructor(private readonly advertisingService: AdvertisingService) {}

  @Post()
  create(@Body() createAdvertisingDto: CreateAdvertisingDto) {
    return this.advertisingService.create(createAdvertisingDto);
  }

  @Get()
  findAll() {
    return this.advertisingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advertisingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdvertisingDto: UpdateAdvertisingDto) {
    return this.advertisingService.update(+id, updateAdvertisingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.advertisingService.remove(+id);
  }
}
