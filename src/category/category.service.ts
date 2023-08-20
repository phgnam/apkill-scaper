import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Application } from '../database/models/application.entity';
import { Category } from '../database/models/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
    private dataSource: DataSource,
  ) {}

  async list(): Promise<Category[]> {
    return await this.categoryRepo.find({
      order: {
        name: 'ASC',
      },
    });
  }

  async storeApplicationUrls(applicationUrls: string[], categoryUrl: string) {
    if (!categoryUrl) {
      throw new Error('CATEGORY_URL_REQUIRED');
    }
    const category = await this.categoryRepo.findOneBy({ url: categoryUrl });
    if (!category) {
      throw new Error('CATEGORY_NOT_FOUND');
    }
    await this.dataSource.transaction(async (manager) => {
      const newApplications = [...new Set(applicationUrls)].map(
        (applicationUrl) => {
          return manager.create(Application, {
            url: applicationUrl,
            category: category.url,
          });
        },
      );
      await manager.save(newApplications);
      await manager.increment(
        Category,
        { url: category.url },
        'completedItems',
        newApplications.length,
      );
    });
    return {};
  }
}
