import { Module } from '@nestjs/common'
import { AdvertisingService } from './advertising.service'
import { AdvertisingController } from './advertising.controller'
import { PrismaService } from 'src/prisma'
import { AuthModule } from 'src/auth'

@Module({
  controllers: [ AdvertisingController ],
  providers: [
    AdvertisingService,
    PrismaService
  ],
  imports: [ AuthModule ],
  exports: [ AdvertisingService ]
})
export class AdvertisingModule {}
