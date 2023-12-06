import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubparametersService } from './subparameters.service';
import { CreateSubparameterDto } from './dto/create-subparameter.dto';
import { UpdateSubparameterDto } from './dto/update-subparameter.dto';

@Controller('subparameters')
export class SubparametersController {
  constructor(private readonly subparametersService: SubparametersService) {}

  @Post()
  create(@Body() createSubparameterDto: CreateSubparameterDto) {
    return this.subparametersService.create(createSubparameterDto);
  }

  @Get()
  findAll() {
    return this.subparametersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subparametersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubparameterDto: UpdateSubparameterDto) {
    return this.subparametersService.update(+id, updateSubparameterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subparametersService.remove(+id);
  }
}
