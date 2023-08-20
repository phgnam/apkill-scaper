import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationVersion } from '../database/models/application-version.entity';
import { Application } from '../database/models/application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationVersion, Application])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
