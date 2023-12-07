import { Module } from '@nestjs/common';
import { TakenCoursesService } from './taken-courses.service';
import { TakenCoursesController } from './taken-courses.controller';

@Module({
  controllers: [TakenCoursesController],
  providers: [TakenCoursesService],
})
export class TakenCoursesModule {}
