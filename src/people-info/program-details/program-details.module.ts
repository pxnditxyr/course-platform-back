import { Module } from '@nestjs/common';
import { ProgramDetailsService } from './program-details.service';
import { ProgramDetailsController } from './program-details.controller';
import { PrismaService } from 'src/prisma';
import { AuthModule } from 'src/auth';
import { UsersModule } from 'src/users';
import { SubparametersModule } from 'src/parametric';
import { AdvertisingModule } from 'src/advertising';

@Module({
  controllers: [ ProgramDetailsController ],
  providers: [
    ProgramDetailsService,
    PrismaService
  ],
  imports: [
    AuthModule,
    UsersModule,
    SubparametersModule,
    AdvertisingModule
  ]
})
export class ProgramDetailsModule {}
