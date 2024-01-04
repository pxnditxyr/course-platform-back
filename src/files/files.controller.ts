import { Controller, Post, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common'
import { FilesService } from './files.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { fileNamer } from 'src/utils'

@Controller( 'files' )
export class FilesController {
  constructor( private readonly filesService : FilesService ) {}

  @Post( 'categories' )
  @UseInterceptors( FileInterceptor( 'image', {
    storage: diskStorage({
      destination: './static/uploads',
      filename: fileNamer
    })
  } ) )
  uploadCategoryImage (
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 30 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /image\/jpeg|jpg|png|bmp|webp/ })
        ]
      }),
    ) file : Express.Multer.File
  ) {
    return this.filesService.uploadCategoryImage( file )
  }

  // @Post( 'courses' )
  // uploadCourseImage ( @Body() body ) {
  //   return this.filesService.uploadCourseImage( body )
  // }
  //
  // @Post( 'documents' )
  // uploadDocument ( @Body() body ) {
  //   return this.filesService.uploadDocument( body )
  // }
}
