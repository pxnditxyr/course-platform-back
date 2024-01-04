import { Injectable } from '@nestjs/common'

@Injectable()
export class FilesService {
  async uploadCategoryImage ( file : Express.Multer.File ) {
    const { filename } = file
    return file
  }
}
