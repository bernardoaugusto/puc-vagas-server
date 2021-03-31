/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class hardSkills1617227587341 implements MigrationInterface {
  name = 'hardSkills1617227587341';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "hard-skills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "vacancy_id" uuid NOT NULL, "description" character varying NOT NULL, "stars" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d086ad35cd3de0305f978f5351a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "hard-skills" ADD CONSTRAINT "FK_cc3e28c7d75d9e8dd7c3d808eb5" FOREIGN KEY ("vacancy_id") REFERENCES "vacancies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hard-skills" DROP CONSTRAINT "FK_cc3e28c7d75d9e8dd7c3d808eb5"`,
    );
    await queryRunner.query(`DROP TABLE "hard-skills"`);
  }
}
