import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '../database/models/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getHello(): Promise<Category[]> {
    return await this.categoryService.list();
  }

  @Post('store-application-urls')
  async storeApplicationUrls(
    @Body('applicationUrls') applicationUrls: string[],
    @Body('categoryUrl') categoryUrl: string,
  ) {
    return await this.categoryService.storeApplicationUrls(
      applicationUrls,
      categoryUrl,
    );
  }
}
