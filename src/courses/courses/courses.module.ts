import { Module } from '@nestjs/common'
import { CoursesService } from './courses.service'
import { CoursesController } from './courses.controller'
import { PrismaService } from 'src/prisma'
import { AuthModule } from 'src/auth'
import { CategoriesModule } from '../categories/categories.module'

@Module({
  controllers: [ CoursesController ],
  providers: [
    CoursesService,
    PrismaService
  ],
  imports: [
    AuthModule,
    CategoriesModule
  ],
  exports: [ CoursesService ]
})
export class CoursesModule {}
