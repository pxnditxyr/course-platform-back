import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { PrismaService } from 'src/prisma'
import { AuthModule } from 'src/auth'

@Module({
  controllers: [ UsersController ],
  providers: [
    UsersService,
    PrismaService,
  ],
  imports: [ AuthModule ],
  exports: [ UsersService ],
})
export class UsersModule {}
