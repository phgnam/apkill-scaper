import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './models/category.entity';
import { SeedCategoryData1629999999999 } from './migrations/1629999999999-SeedCategoryData';
import { Application } from './models/application.entity';
import { ApplicationVersion } from './models/application-version.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'apkills.sql',
      entities: [Category, Application, ApplicationVersion],
      migrations: [SeedCategoryData1629999999999],
      migrationsRun: true,
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
