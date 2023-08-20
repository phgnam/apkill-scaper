import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Application } from '../database/models/application.entity';
import { Category } from '../database/models/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Application])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
