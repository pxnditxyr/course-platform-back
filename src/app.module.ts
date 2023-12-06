import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users';
import { ParametersModule, SubparametersModule } from './parametrics';
import {
  BillingsModule,
  ContactInfoModule, DocumentsModule, PersonalInfoModule, ProgramDetailsModule, WorkingInfoModule } from './people-info';
import { AdvertisingModule } from './advertising';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    ParametersModule, SubparametersModule,
    PersonalInfoModule, ContactInfoModule, WorkingInfoModule, 
    AdvertisingModule, ProgramDetailsModule, DocumentsModule,
    BillingsModule,
  ]
})
export class AppModule {}
