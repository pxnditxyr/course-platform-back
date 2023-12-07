import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto, UpdateCategoryDto } from './dto'
import { Category } from './entities/category.entity'
import { Auth, CurrentUser } from 'src/auth/decorators'
import { User } from 'src/users/users/entities/user.entity'

@Controller( 'categories' )
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService
  ) {}

  @Post()
  @Auth()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @CurrentUser() creator: User
  ): Promise<Category> {
    return this.categoriesService.create( createCategoryDto, creator )
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll()
  }

  @Get( ':id' )
  async findOne(
    @Param( 'id', ParseUUIDPipe ) id: string
  ) {
    return this.categoriesService.findOne(id)
  }

  @Patch( ':id' )
  @Auth()
  async update(
    @Param( 'id', ParseUUIDPipe ) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @CurrentUser() updater: User
  ) {
    return this.categoriesService.update( id, updateCategoryDto, updater )
  }

  @Delete( ':id' )
  @Auth()
  toggleStatus(
    @Param( 'id' ) id: string,
    @CurrentUser() updater: User
  ) {
    return this.categoriesService.toggleStatus( id, updater )
  }
}
