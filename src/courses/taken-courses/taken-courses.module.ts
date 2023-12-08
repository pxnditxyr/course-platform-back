import { Module } from '@nestjs/common'
import { TakenCoursesService } from './taken-courses.service'
import { TakenCoursesController } from './taken-courses.controller'
import { PrismaService } from 'src/prisma'
import { CategoriesModule } from '../categories/categories.module'
import { UsersModule } from 'src/users'
import { AuthModule } from 'src/auth'

@Module({
  controllers: [ TakenCoursesController ],
  providers: [
    TakenCoursesService,
    PrismaService
  ],
  imports: [
    AuthModule,
    CategoriesModule,
    UsersModule
  ],
  exports: [ TakenCoursesService ]
})
export class TakenCoursesModule {}
