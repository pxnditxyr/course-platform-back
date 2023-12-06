import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgramDetailsService } from './program-details.service';
import { CreateProgramDetailDto } from './dto/create-program-detail.dto';
import { UpdateProgramDetailDto } from './dto/update-program-detail.dto';

@Controller('program-details')
export class ProgramDetailsController {
  constructor(private readonly programDetailsService: ProgramDetailsService) {}

  @Post()
  create(@Body() createProgramDetailDto: CreateProgramDetailDto) {
    return this.programDetailsService.create(createProgramDetailDto);
  }

  @Get()
  findAll() {
    return this.programDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramDetailDto: UpdateProgramDetailDto) {
    return this.programDetailsService.update(+id, updateProgramDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programDetailsService.remove(+id);
  }
}
