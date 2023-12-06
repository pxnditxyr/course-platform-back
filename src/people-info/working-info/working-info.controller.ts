import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkingInfoService } from './working-info.service';
import { CreateWorkingInfoDto } from './dto/create-working-info.dto';
import { UpdateWorkingInfoDto } from './dto/update-working-info.dto';

@Controller('working-info')
export class WorkingInfoController {
  constructor(private readonly workingInfoService: WorkingInfoService) {}

  @Post()
  create(@Body() createWorkingInfoDto: CreateWorkingInfoDto) {
    return this.workingInfoService.create(createWorkingInfoDto);
  }

  @Get()
  findAll() {
    return this.workingInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workingInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkingInfoDto: UpdateWorkingInfoDto) {
    return this.workingInfoService.update(+id, updateWorkingInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workingInfoService.remove(+id);
  }
}
