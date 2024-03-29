import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users'
import { ParametersModule, SubparametersModule } from './parametric'
import {
  BillingsModule,
  ContactInfoModule, DocumentsModule, PersonalInfoModule, ProgramDetailsModule, WorkingInfoModule } from './people-info'
import { AdvertisingModule } from './advertising'
import { CategoriesModule, CoursesModule, TakenCoursesModule } from './courses'
import { AuthModule } from './auth'
import { FilesModule } from './files'

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    ParametersModule, SubparametersModule,
    PersonalInfoModule, ContactInfoModule, WorkingInfoModule, 
    AdvertisingModule, ProgramDetailsModule, DocumentsModule,
    BillingsModule,
    CoursesModule,
    CategoriesModule,
    TakenCoursesModule,
    AuthModule,
    FilesModule,
  ]
})
export class AppModule {}
