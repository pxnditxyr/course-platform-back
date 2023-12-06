import { Module } from '@nestjs/common';
import { AdvertisingService } from './advertising.service';
import { AdvertisingController } from './advertising.controller';

@Module({
  controllers: [AdvertisingController],
  providers: [AdvertisingService],
})
export class AdvertisingModule {}
