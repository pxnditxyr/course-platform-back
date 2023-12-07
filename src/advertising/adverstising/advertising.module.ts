import { Module } from '@nestjs/common'
import { AdvertisingService } from './advertising.service'
import { AdvertisingController } from './advertising.controller'
import { PrismaService } from 'src/prisma'

@Module({
  controllers: [ AdvertisingController ],
  providers: [
    AdvertisingService,
    PrismaService
  ],
})
export class AdvertisingModule {}
