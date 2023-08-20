import { MigrationInterface, QueryRunner } from 'typeorm';
import { categories } from '../seeds/categories';

export class SeedCategoryData1629999999999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const categoryData of categories) {
      await queryRunner.query(`
        INSERT INTO category (name, total, url)
        VALUES ('${categoryData.name}', ${categoryData.total}, '${categoryData.url}')
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const categoryData of categories) {
      await queryRunner.query(`
        DELETE FROM category WHERE url = '${categoryData.url}'
      `);
    }
  }
}
