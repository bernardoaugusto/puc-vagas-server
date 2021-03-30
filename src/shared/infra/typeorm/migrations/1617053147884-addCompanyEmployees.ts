/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCompanyEmployees1617053147884 implements MigrationInterface {
  name = 'addCompanyEmployees1617053147884';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users_companies_companies" ("usersId" uuid NOT NULL, "companiesId" uuid NOT NULL, CONSTRAINT "PK_1e2fe6efdcab75ff7baa9b8f9c6" PRIMARY KEY ("usersId", "companiesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3f24306c292c62ea206314589d" ON "users_companies_companies" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_68fce129b57f3972b3b1b10f42" ON "users_companies_companies" ("companiesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "users_companies_companies" ADD CONSTRAINT "FK_3f24306c292c62ea206314589d2" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_companies_companies" ADD CONSTRAINT "FK_68fce129b57f3972b3b1b10f42d" FOREIGN KEY ("companiesId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_companies_companies" DROP CONSTRAINT "FK_68fce129b57f3972b3b1b10f42d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_companies_companies" DROP CONSTRAINT "FK_3f24306c292c62ea206314589d2"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_68fce129b57f3972b3b1b10f42"`);
    await queryRunner.query(`DROP INDEX "IDX_3f24306c292c62ea206314589d"`);
    await queryRunner.query(`DROP TABLE "users_companies_companies"`);
  }
}
