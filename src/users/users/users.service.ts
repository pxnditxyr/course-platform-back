import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from './dto'
import { PrismaService } from 'src/prisma'
import { User } from './entities/user.entity'
import { extractPrismaExceptions } from 'src/utils'
import { hashSync } from 'bcrypt'

const usersIncludes = {
  creator: true,
  updater: true,
}

@Injectable()
export class UsersService {

  constructor (
    private readonly prismaService : PrismaService
  ) {}

  async create (
    createUserDto : CreateUserDto,
    creator? : User
  ) : Promise<User> {
    try {
      const user = await this.prismaService.users.create({
        data: {
          ...createUserDto,
          password: hashSync( createUserDto.password, 10 ),
          createdBy: creator?.id
        },
        include: { ...usersIncludes }
      })
      return user
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () : Promise<User[]> {
    const users = await this.prismaService.users.findMany({
      include: { ...usersIncludes }
    })
    return users
  }

  async findOne ( id : string ) : Promise<User> {
    const user = await this.prismaService.users.findUnique({
      where: { id },
      include: { ...usersIncludes }
    })
    if ( !user ) throw new BadRequestException( 'El usuario no existe' )
    return user
  }

  async findOneByEmail ( email : string ) : Promise<User> {
    const user = await this.prismaService.users.findUnique({
      where: { email },
      include: { ...usersIncludes }
    })
    if ( !user ) throw new BadRequestException( `El usuario con email ${ email } no existe` )
    return user
  }

  async update ( id : string, updateUserDto : UpdateUserDto, updater : User ) : Promise<User> {
    await this.findOne( id )
    try {
      const newPassword = updateUserDto.password ? hashSync( updateUserDto.password, 10 ) : undefined
      const user = await this.prismaService.users.update({
        where: { id },
        data: {
          ...updateUserDto,
          password: newPassword,
          updatedBy: updater.id
        },
        include: { ...usersIncludes }
      })
      return user
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async toggleStatus ( id : string, updater : User ) : Promise<User> {
    const currentUser = await this.findOne( id )
    try {
      const user = await this.prismaService.users.update({
        where: { id },
        data: {
          status: !currentUser.status,
          updatedBy: updater.id
        },
        include: { ...usersIncludes }
      })
      return user
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    const prismaError = extractPrismaExceptions( error )
    if ( prismaError ) throw new BadRequestException( prismaError )
    throw new InternalServerErrorException( 'Error no esperado, por favor contacte al administrador' )
  }
}
