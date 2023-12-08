import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateContactInfoDto } from './dto/create-contact-info.dto'
import { UpdateContactInfoDto } from './dto/update-contact-info.dto'
import { PrismaService } from 'src/prisma'
import { UsersService } from 'src/users/users/users.service'
import { User } from 'src/users/users/entities/user.entity'
import { ContactInfo } from './entities/contact-info.entity'

const contactInfoIncludes = {
  creator: true,
  updater: true,
  user: true
}

@Injectable()
export class ContactInfoService {

  constructor (
    private readonly prismaService : PrismaService,
    private readonly usersService : UsersService
  ) {}

  async create ( createContactInfoDto : CreateContactInfoDto, creator : User ) : Promise<ContactInfo> {
    const { userId } = createContactInfoDto
    await this.usersService.findOne( userId )
    try {
      const contactInfo = await this.prismaService.contactInfo.create( {
        data: {
          ...createContactInfoDto,
          createdBy: creator.id
        },
        include: { ...contactInfoIncludes }
      } )
      return contactInfo
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () : Promise<ContactInfo[]> {
    const contactInfos = await this.prismaService.contactInfo.findMany({
      include: { ...contactInfoIncludes }
    })
    return contactInfos
  }

  async findOne ( id : string ) : Promise<ContactInfo> {
    const contactInfo = await this.prismaService.contactInfo.findUnique({
      where: { id },
      include: { ...contactInfoIncludes }
    })
    if ( !contactInfo ) throw new NotFoundException( 'Información de contacto no encontrada' )
    return contactInfo
  }

  async findByUserId ( userId : string ) : Promise<ContactInfo> {
    const contactInfo = await this.prismaService.contactInfo.findFirst({
      where: { userId },
      include: { ...contactInfoIncludes }
    })
    if ( !contactInfo ) throw new NotFoundException( 'Información de contacto del usuario no encontrada' )
    return contactInfo
  }

  async update ( id : string, updateContactInfoDto : UpdateContactInfoDto, updater : User ) : Promise<ContactInfo> {
    await this.findOne( id )
    const { userId } = updateContactInfoDto
    if ( userId ) await this.usersService.findOne( userId )
    try {
      const contactInfo = await this.prismaService.contactInfo.update( {
        where: { id },
        data: {
          ...updateContactInfoDto,
          updatedBy: updater.id
        },
        include: { ...contactInfoIncludes }
      } )
      return contactInfo
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async toggleStatus ( id : string, updater : User ) : Promise<ContactInfo> {
    const currentContactInfo = await this.findOne( id )
    try {
      const contactInfo = await this.prismaService.contactInfo.update( {
        where: { id },
        data: {
          status: !currentContactInfo.status,
          updatedBy: updater.id
        },
        include: { ...contactInfoIncludes }
      } )
      return contactInfo
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new InternalServerErrorException( 'Error no esperado, por favor contacte al administrador' )
  }
}
