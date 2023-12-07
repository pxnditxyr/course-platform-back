import { Module } from '@nestjs/common'
import { SubparametersService } from './subparameters.service'
import { SubparametersController } from './subparameters.controller'
import { PrismaService } from 'src/prisma'
import { AuthModule } from 'src/auth'
import { ParametersModule } from '../parameters/parameters.module'

@Module({
  controllers: [ SubparametersController ],
  providers: [
    SubparametersService,
    PrismaService
  ],
  imports: [
    AuthModule,
    ParametersModule
  ],
  exports: [ SubparametersService ]
})
export class SubparametersModule {}
