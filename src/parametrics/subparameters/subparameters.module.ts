import { Module } from '@nestjs/common';
import { SubparametersService } from './subparameters.service';
import { SubparametersController } from './subparameters.controller';

@Module({
  controllers: [SubparametersController],
  providers: [SubparametersService],
})
export class SubparametersModule {}
