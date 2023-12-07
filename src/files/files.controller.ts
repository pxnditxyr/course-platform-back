import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor( private readonly filesService : FilesService ) {}

  @Post( 'categories' )
  @UseInterceptors( FileInterceptor( 'image' ) )
  uploadCategoryImage (
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: /image\/jpeg|jpg|png|bmp|webp/ })
        ]
      })
    ) file : Express.Multer.File
  ) {
    return file
  }

  // @Post( 'courses' )
  // uploadCourseImage ( @Body() body ) {
  //   return this.filesService.uploadCourseImage( body );
  // }
  //
  // @Post( 'documents' )
  // uploadDocument ( @Body() body ) {
  //   return this.filesService.uploadDocument( body );
  // }
}
