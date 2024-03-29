import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  ( _data, ctx : ExecutionContext ) => {
    const request = ctx.switchToHttp().getRequest()
    const user = request.user
    console.log( 'user', user )
    if ( !user ) throw new InternalServerErrorException( 'No se ha encontrado el usuario' )
    return user
  }
)
