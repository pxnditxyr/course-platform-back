import { Module } from '@nestjs/common'
import { BillingsService } from './billings.service'
import { BillingsController } from './billings.controller'
import { PrismaService } from 'src/prisma'
import { AuthModule } from 'src/auth'
import { UsersModule } from 'src/users'

@Module({
  controllers: [ BillingsController ],
  providers: [
    BillingsService,
    PrismaService,
  ],
  imports: [
    AuthModule,
    UsersModule
  ],
  exports: [ BillingsService ]
})
export class BillingsModule {}
