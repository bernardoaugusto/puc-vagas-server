/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class addSoftSkillsOnUser1617147137607 implements MigrationInterface {
  name = 'addSoftSkillsOnUser1617147137607';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user-soft-skills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "soft_skill_id" uuid NOT NULL, "stars" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8206bcd8bc350c9d258762d7e94" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-soft-skills" ADD CONSTRAINT "FK_311ce5cc94e41e56dade54efd97" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-soft-skills" ADD CONSTRAINT "FK_5604b48151e4bbd673981d0aa3c" FOREIGN KEY ("soft_skill_id") REFERENCES "soft-skills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user-soft-skills" DROP CONSTRAINT "FK_5604b48151e4bbd673981d0aa3c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-soft-skills" DROP CONSTRAINT "FK_311ce5cc94e41e56dade54efd97"`,
    );
    await queryRunner.query(`DROP TABLE "user-soft-skills"`);
  }
}
