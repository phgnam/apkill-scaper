import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { CategoryModule } from './category/category.module';
import { AppModule } from './app/app.module';

@Module({
  imports: [DatabaseModule, CategoryModule, AppModule],
})
export class MainModule {}
