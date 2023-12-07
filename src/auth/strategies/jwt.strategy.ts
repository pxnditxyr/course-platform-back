import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from '../auth.service'
import { ConfigService } from '@nestjs/config'
import { IJwtPayload } from '../interfaces'
import { User } from 'src/users/users/entities/user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {
  constructor (
    private readonly authService : AuthService,
    configService : ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>( 'JWT_SECRET' )
    })
  }

  async validate ( payload : IJwtPayload ) : Promise<User> {
    const { id } = payload
    const user = await this.authService.validateUser( id )
    if ( !user.status ) throw new UnauthorizedException( 'Esta cuenta ha sido eliminada, por favor contacte al administrador' )
    return user
  }
}
