/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class addVacancySoftSkills1617195476309 implements MigrationInterface {
  name = 'addVacancySoftSkills1617195476309';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "vacancy-soft-skills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "vacancy_id" uuid NOT NULL, "soft_skill_id" uuid NOT NULL, "stars" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_774e62da0e9f5a68370d7951767" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "vacancy-soft-skills" ADD CONSTRAINT "FK_81c7780543d9d72b4e230da4124" FOREIGN KEY ("vacancy_id") REFERENCES "vacancies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vacancy-soft-skills" ADD CONSTRAINT "FK_bbd89643ce640167b2db4b6811a" FOREIGN KEY ("soft_skill_id") REFERENCES "soft-skills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vacancy-soft-skills" DROP CONSTRAINT "FK_bbd89643ce640167b2db4b6811a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vacancy-soft-skills" DROP CONSTRAINT "FK_81c7780543d9d72b4e230da4124"`,
    );
    await queryRunner.query(`DROP TABLE "vacancy-soft-skills"`);
  }
}
