import { Module, forwardRef } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from 'src/users'
import { JwtStrategy } from './strategies'

@Module({
  controllers: [ AuthController ],
  providers: [ AuthService, JwtStrategy ],
  imports: [
    ConfigModule,
    forwardRef( () => UsersModule ),
    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( configService : ConfigService ) => ({
        secret: configService.get<string>( 'JWT_SECRET' ),
        signOptions: { expiresIn: configService.get<string>( 'JWT_EXPIRES_IN' ) }
      })
    }),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  exports: [ PassportModule, JwtStrategy, JwtModule ]
})
export class AuthModule {}
