/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCompanyIdAndrecruterIdOnVacancy1617105243589
  implements MigrationInterface {
  name = 'addCompanyIdAndrecruterIdOnVacancy1617105243589';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vacancies" ADD "company_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "vacancies" ADD "recruiter_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "vacancies" ADD CONSTRAINT "FK_053198d00d977357314f47d1cf2" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vacancies" ADD CONSTRAINT "FK_2f691d6cd6b5e634ed88a207fc3" FOREIGN KEY ("recruiter_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vacancies" DROP CONSTRAINT "FK_2f691d6cd6b5e634ed88a207fc3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vacancies" DROP CONSTRAINT "FK_053198d00d977357314f47d1cf2"`,
    );
    await queryRunner.query(`ALTER TABLE "vacancies" DROP COLUMN "recruiter_id"`);
    await queryRunner.query(`ALTER TABLE "vacancies" DROP COLUMN "company_id"`);
  }
}
