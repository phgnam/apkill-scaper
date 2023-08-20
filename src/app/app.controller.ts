import { Controller, Post, Get, Query, Body } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Query('limit') limit: number): Promise<string[]> {
    return await this.appService.list(limit || 10);
  }

  @Post()
  async storeApplicationUrls(@Body() data) {
    return await this.appService.store(data);
  }

  @Post('mark-error')
  async markError(@Body('url') url: string) {
    return await this.appService.markError(url);
  }

  @Post('mark-error-app-version')
  async markErrorAppVersion(@Body('url') url: string) {
    return await this.appService.markErrorAppVersion(url);
  }

  @Get('app-versions')
  async listAppVersions(@Query('limit') limit: number): Promise<string[]> {
    return await this.appService.listAppVersions(limit || 10);
  }

  @Post('update-download-url-app-version')
  async updateDownloadUrlAppVersion(@Body() data) {
    return await this.appService.updateDownloadUrlAppVersion(data);
  }
}
