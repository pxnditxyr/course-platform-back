import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateDocumentDto, UpdateDocumentDto } from './dto'
import { PrismaService } from 'src/prisma'
import { UsersService } from 'src/users/users/users.service'
import { SubparametersService } from 'src/parametric/subparameters/subparameters.service'
import { User } from 'src/users/users/entities/user.entity'
import { Document } from './entities/document.entity'

const documentIncludes = {
  creator: true,
  updater: true,
  documentType: true,
  user: true,
}

@Injectable()
export class DocumentsService {

  constructor (
    private readonly prismaService : PrismaService,
    private readonly usersService : UsersService,
    private readonly subparametersService : SubparametersService
  ) {}

  async create ( createDocumentDto : CreateDocumentDto, creator : User ) : Promise<Document> {
    const { userId, documentTypeId } = createDocumentDto
    await this.usersService.findOne( userId )
    await this.subparametersService.findOne( documentTypeId )

    try {
      const newDocument = await this.prismaService.documents.create({
        data: {
          ...createDocumentDto,
          createdBy: creator.id,
        },
        include: { ...documentIncludes }
      })
      return newDocument
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () : Promise<Document[]> {
    const documents = await this.prismaService.documents.findMany({
      include: { ...documentIncludes }
    })
    return documents
  }

  async findOne ( id : string ) : Promise<Document> {
    const documentById = await this.prismaService.documents.findUnique({
      where: { id },
      include: { ...documentIncludes }
    })
    if ( !documentById ) throw new NotFoundException( 'El documento no existe' )
    return documentById
  }

  async findOneByUser ( userId : string ) : Promise<Document> {
    const documentByUserId = await this.prismaService.documents.findFirst({
      where: { userId },
      include: { ...documentIncludes }
    })
    if ( !documentByUserId ) throw new NotFoundException( 'El documento del usuario no existe' )
    return documentByUserId
  }

  async update ( id : string, updateDocumentDto : UpdateDocumentDto, updater : User ) : Promise<Document> {
    await this.findOne( id )
    const { userId, documentTypeId } = updateDocumentDto
    if ( userId ) await this.usersService.findOne( userId )
    if ( documentTypeId ) await this.subparametersService.findOne( documentTypeId )
    try {
      const updatedDocument = await this.prismaService.documents.update({
        where: { id },
        data: {
          ...updateDocumentDto,
          updatedBy: updater.id,
        },
        include: { ...documentIncludes }
      })
      return updatedDocument
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async toggleStatus ( id : string, updater : User ) : Promise<Document> {
    const currentDocument = await this.findOne( id )
    try {
      const updatedDocument = await this.prismaService.documents.update({
        where: { id },
        data: {
          status: !currentDocument.status,
          updatedBy: updater.id,
        },
        include: { ...documentIncludes }
      })
      return updatedDocument
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new InternalServerErrorException( 'Error no esperado, por favor contacte al administrador' )
  }
}
