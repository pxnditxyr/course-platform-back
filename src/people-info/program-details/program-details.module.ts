import { Module } from '@nestjs/common';
import { ProgramDetailsService } from './program-details.service';
import { ProgramDetailsController } from './program-details.controller';

@Module({
  controllers: [ProgramDetailsController],
  providers: [ProgramDetailsService],
})
export class ProgramDetailsModule {}
