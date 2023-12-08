import { Module } from '@nestjs/common'
import { DocumentsService } from './documents.service'
import { DocumentsController } from './documents.controller'
import { PrismaService } from 'src/prisma'
import { AuthModule } from 'src/auth'
import { UsersModule } from 'src/users'
import { SubparametersModule } from 'src/parametric'

@Module({
  controllers: [ DocumentsController ],
  providers: [
    DocumentsService,
    PrismaService
  ],
  imports: [
    AuthModule,
    UsersModule,
    SubparametersModule
  ],
  exports: [ DocumentsService ]
})
export class DocumentsModule {}
