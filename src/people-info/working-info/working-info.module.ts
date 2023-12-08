import { Module } from '@nestjs/common'
import { WorkingInfoService } from './working-info.service'
import { WorkingInfoController } from './working-info.controller'
import { PrismaService } from 'src/prisma'
import { AuthModule } from 'src/auth'
import { UsersModule } from 'src/users'
import { SubparametersModule } from 'src/parametric'

@Module({
  controllers: [ WorkingInfoController ],
  providers: [
    WorkingInfoService,
    PrismaService,
  ],
  imports: [
    AuthModule,
    UsersModule,
    SubparametersModule
  ],
  exports: [ WorkingInfoService ]
})
export class WorkingInfoModule {}
