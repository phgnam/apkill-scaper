import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import puppeteer from 'puppeteer-extra';
import { Repository } from 'typeorm';
import { Browser, executablePath } from 'puppeteer';
// eslint-disable-next-line @typescript-eslint/no-var-requires
puppeteer.use(require('puppeteer-extra-plugin-stealth')());

import { Category } from '../database/models/category.entity';
import { Application } from '../database/models/application.entity';

@Injectable()
export class ScaperService {
  private browser: Browser;

  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
    @InjectRepository(Application)
    private applicationRepo: Repository<Application>,
  ) {
    this.initializeBrowser();
  }

  private async initializeBrowser(): Promise<void> {
    this.browser = await puppeteer.launch({
      headless: false,
      executablePath: executablePath(),
    });
    const categories = await this.categoryRepo.find();
    for (let index = 0; index < categories.length; index++) {
      const element = categories[index]; //categories.find((i) => i.url.includes('horror'));
      await this.scrapeListItemsOfCategory(element);
      break;
    }
  }

  async closeBrowser(): Promise<void> {
    await this.browser.close();
  }

  async scrapeListItemsOfCategory(category: Category): Promise<any> {
    if (category.total === category.completedItems) return;

    for (
      let i = Math.floor(category.completedItems / 12) + 1;
      i < Math.ceil(category.total / 12);
      i++
    ) {
      const page = await this.browser.newPage();
      await page.setUserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      );
      await page.goto(category.url + '?page=' + i);

      await page.waitForSelector('.flex-item', {
        timeout: 300000,
      });
      const pageTitle = await page.evaluate(() => {
        const articleElements = document.querySelectorAll('.flex-item');
        const hrefList = [];

        articleElements.forEach((article) => {
          const linkElement = article.querySelector('a');
          const href = linkElement.getAttribute('href');
          hrefList.push(href);
        });

        console.log(hrefList);
        return hrefList;
      });
      console.log('pageTitle', pageTitle);
      // Close the browser after scraping
      page.close();
    }

    return;
  }
}
