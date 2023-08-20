import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, IsNull } from 'typeorm';

import { Application } from '../database/models/application.entity';
import { ApplicationVersion } from '../database/models/application-version.entity';

function getUniqueElementsByKey(array, key) {
  const uniqueElements = {};
  const result = [];

  array.forEach((element) => {
    const keyValue = element[key];
    if (!uniqueElements[keyValue]) {
      uniqueElements[keyValue] = true;
      result.push(element);
    }
  });

  return result;
}

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Application)
    private appRepo: Repository<Application>,
    @InjectRepository(ApplicationVersion)
    private appVersionRepo: Repository<ApplicationVersion>,
    private dataSource: DataSource,
  ) {}

  async list(limit: number): Promise<string[]> {
    return (
      await this.appRepo.find({
        where: {
          packageName: IsNull(),
          error: IsNull(),
        },
        order: {
          category: 'ASC',
          name: 'ASC',
        },
        take: limit,
      })
    ).map((i) => i.url);
  }

  async store(data) {
    return await this.dataSource.transaction(async (manager) => {
      const newApplication = manager.create(Application, data);
      await manager.save(newApplication);
      const newAppVersions = getUniqueElementsByKey(data.versions, 'url').map(
        (version) => {
          return manager.create(ApplicationVersion, {
            packageName: data.packageName,
            url: version.url,
            versionNumber: version.versionNumber,
          });
        },
      );
      await manager.save(newAppVersions);
      return {};
    });
  }

  async markError(url: string) {
    return await this.appRepo.update({ url }, { error: true });
  }

  async listAppVersions(limit: number): Promise<string[]> {
    return (
      await this.appVersionRepo.find({
        where: {
          downloadUrl: IsNull(),
        },
        order: {
          createdAt: 'ASC',
        },
        take: limit,
      })
    ).map((i) => i.url);
  }

  async markErrorAppVersion(url: string) {
    return await this.appVersionRepo.update({ url }, { error: true });
  }

  async updateDownloadUrlAppVersion(data) {
    const { url, downloadUrl } = data;
    return await this.appVersionRepo.update({ url }, { downloadUrl });
  }
}
