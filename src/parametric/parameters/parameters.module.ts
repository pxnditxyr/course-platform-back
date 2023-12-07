import { Module } from '@nestjs/common'
import { ParametersService } from './parameters.service'
import { ParametersController } from './parameters.controller'
import { PrismaService } from 'src/prisma'
import { AuthModule } from 'src/auth'

@Module({
  controllers: [ ParametersController ],
  providers: [
    ParametersService,
    PrismaService,
  ],
  imports: [ AuthModule ],
  exports: [ ParametersService ],
})
export class ParametersModule {}
