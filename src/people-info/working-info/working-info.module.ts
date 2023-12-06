import { Module } from '@nestjs/common';
import { WorkingInfoService } from './working-info.service';
import { WorkingInfoController } from './working-info.controller';

@Module({
  controllers: [WorkingInfoController],
  providers: [WorkingInfoService],
})
export class WorkingInfoModule {}
