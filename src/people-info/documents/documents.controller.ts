import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { DocumentsService } from './documents.service'
import { CreateDocumentDto, UpdateDocumentDto } from './dto'
import { Auth, CurrentUser } from 'src/auth/decorators'
import { User } from 'src/users/users/entities/user.entity'
import { Document } from './entities/document.entity'

@Controller( 'documents' )
export class DocumentsController {
  constructor( private readonly documentsService: DocumentsService ) {}

  @Post()
  @Auth()
  async create (
    @Body() createDocumentDto : CreateDocumentDto,
    @CurrentUser() creator : User
  ) : Promise<Document> {
    return this.documentsService.create( createDocumentDto, creator )
  }

  @Get()
  async findAll () : Promise<Document[]> {
    return this.documentsService.findAll()
  }

  @Get( ':id' )
  async findOne(
    @Param( 'id', ParseUUIDPipe ) id: string
  ) { 
    return this.documentsService.findOne( id )
  }

  @Get( 'user/:userId' )
  async findByUser(
    @Param( 'userId', ParseUUIDPipe ) userId: string
  ) : Promise<Document> {
    return this.documentsService.findOneByUser( userId )
  }

  @Patch( ':id' )
  @Auth()
  async update (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @Body() updateDocumentDto : UpdateDocumentDto,
    @CurrentUser() updater : User
  ) {
    return this.documentsService.update( id, updateDocumentDto, updater )
  }

  @Delete( ':id' )
  @Auth()
  async toggleStatus (
    @Param( 'id', ParseUUIDPipe ) id : string,
    @CurrentUser() updater : User
  ) {
    return this.documentsService.toggleStatus( id, updater )
  }
}
