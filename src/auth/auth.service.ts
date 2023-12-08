import { Injectable, UnauthorizedException } from '@nestjs/common'
import { SigninDto, SignupDto } from './dto'
import { AuthResponse, UserResponse } from './types'
import { UsersService } from 'src/users/users/users.service'
import { ValidRoles } from './enums/valid-roles.enum'
import { User } from 'src/users/users/entities/user.entity'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor (
    private readonly usersService : UsersService,
    private readonly jwtService : JwtService
  ) {}

  async signin ( signinDto : SigninDto ) : Promise<AuthResponse> {
    try {
      const user = await this.usersService.findOneByEmail( signinDto.email )
      const { password } = signinDto
      if ( !compareSync( password, user.password ) ) throw new UnauthorizedException( 'Usuario o contraseña incorrectos' )
      const token = this.generateToken( user.id )
      return {
        user: this.getUserResponse( user ),
        token,
      }
    } catch ( error ) {
      throw new UnauthorizedException( 'Usuario o contraseña incorrectos' )
    }

  }

  async signup ( signupDto : SignupDto ) : Promise<AuthResponse> {
    const user = await this.usersService.create({
      ...signupDto,
      role: ValidRoles.USER,
    })
    const token = this.generateToken( user.id )
    return {
      user: this.getUserResponse( user ),
      token,
    }
  }

  async revalidateToken ( user : User ) : Promise<AuthResponse> {
    const { id } = user
    return {
      user: this.getUserResponse( user ),
      token: this.generateToken( id ),
    }
  }

  async validateUser ( id : string ) : Promise<User> {
    const user = await this.usersService.findOne( id )
    return user
  }

  private getUserResponse ( user : User ) : UserResponse {
    return {
      id: user.id,
      role: user.role,
      email: user.email,
      name: user.name,
      paternalSurname: user.paternalSurname,
      maternalSurname: user.maternalSurname,
    }
  }

  private generateToken ( id : string ) : string {
    const jwt = this.jwtService.sign({ id })
    return jwt
  }
}
