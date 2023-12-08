import { Module } from '@nestjs/common'
import { PersonalInfoService } from './personal-info.service'
import { PersonalInfoController } from './personal-info.controller'
import { PrismaService } from 'src/prisma'
import { AuthModule } from 'src/auth'
import { UsersModule } from 'src/users'
import { SubparametersModule } from 'src/parametric'

@Module({
  controllers: [ PersonalInfoController ],
  providers: [
    PersonalInfoService,
    PrismaService
  ],
  imports: [
    AuthModule,
    UsersModule,
    SubparametersModule
  ],
  exports: [ PersonalInfoService ]
})
export class PersonalInfoModule {}
