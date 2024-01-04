import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateCategoryDto, UpdateCategoryDto } from './dto'
import { User } from 'src/users/users/entities/user.entity'
import { PrismaService } from 'src/prisma'
import { Category } from './entities/category.entity'

const categoriesIncludes = {
  creator: true,
  updater: true,
  courses: true,
}

@Injectable()
export class CategoriesService {
  constructor (
    private readonly prismaService : PrismaService
  ) {}
  async create ( createCategoryDto : CreateCategoryDto, creator : User ) : Promise<Category> {
    try {
      const category = await this.prismaService.categories.create({
        data: {
          ...createCategoryDto,
          createdBy: creator.id,
        },
        include: { ...categoriesIncludes },
      })
      return category
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () : Promise<Category[]> {
    const categories = await this.prismaService.categories.findMany({
      include: { ...categoriesIncludes },
      orderBy: { createdAt: 'desc' },
    })
    return categories
  }

  async findOne ( id : string ) : Promise<Category> {
    const category = await this.prismaService.categories.findUnique({
      where: { id },
      include: { ...categoriesIncludes },
    })
    if ( !category ) throw new NotFoundException( 'La categoría que busca no existe' )
    return category
  }

  async update ( id : string, updateCategoryDto : UpdateCategoryDto, updater : User ) : Promise<Category> {
    await this.findOne( id )
    try {
      const category = await this.prismaService.categories.update({
        where: { id },
        data: {
          ...updateCategoryDto,
          updatedBy: updater.id,
        },
        include: { ...categoriesIncludes },
      })
      return category
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async toggleStatus ( id : string, updater : User ) : Promise<Category> {
    const currentCategory = await this.findOne( id )
    try {
      const category = await this.prismaService.categories.update({
        where: { id },
        data: {
          status: !currentCategory.status,
          updatedBy: updater.id,
        },
        include: { ...categoriesIncludes },
      })
      return category
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new InternalServerErrorException( 'Error no esperado, por favor contacte al administrador' )
  }
}
