import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScaperService } from './scaper.service';
import { Category } from '../database/models/category.entity';
import { Application } from '../database/models/application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Application])],
  providers: [ScaperService],
})
export class ScaperModule {}
