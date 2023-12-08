import { Module } from '@nestjs/common'
import { ContactInfoService } from './contact-info.service'
import { ContactInfoController } from './contact-info.controller'
import { PrismaService } from 'src/prisma'
import { AuthModule } from 'src/auth'
import { UsersModule } from 'src/users'

@Module({
  controllers: [ ContactInfoController ],
  providers: [
    ContactInfoService,
    PrismaService
  ],
  imports: [
    AuthModule,
    UsersModule
  ],
  exports: [ ContactInfoService ]
})
export class ContactInfoModule {}
