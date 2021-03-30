/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixDescriptionOnVacancies1617039975115 implements MigrationInterface {
  name = 'fixDescriptionOnVacancies1617039975115';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vacancies" RENAME COLUMN "desription" TO "description"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vacancies" RENAME COLUMN "description" TO "desription"`,
    );
  }
}
