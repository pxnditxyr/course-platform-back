import { Body, Controller, Get, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResponse } from './types'
import { SigninDto, SignupDto } from './dto'
import { User } from 'src/users/users/entities/user.entity'
import { Auth, CurrentUser } from './decorators'

@Controller( 'auth' )
export class AuthController {
  constructor( private readonly authService : AuthService ) {}

  @Post( 'signin' )
  async signin (
    @Body() signinDto : SigninDto
  ) : Promise<AuthResponse> {
    return this.authService.signin( signinDto )
  }

  @Post( 'signup' )
  async signup (
    @Body() signupDto : SignupDto
  ) : Promise<AuthResponse> {
    return this.authService.signup( signupDto )
  }

  @Get( 'revalidate-token' )
  @Auth()
  async revalidateToken (
    @CurrentUser() user : User
  ) : Promise<AuthResponse> {
    return this.authService.revalidateToken( user )
  }
}
