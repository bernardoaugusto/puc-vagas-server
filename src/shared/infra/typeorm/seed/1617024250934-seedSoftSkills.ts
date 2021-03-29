/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class addSoftSkill1617024250934 implements MigrationInterface {
  name = 'addSoftSkill1617024250934';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "soft-skills" (id, description) values ('c3bafa7a-6bc1-4f5a-8fca-d2427fbd8a0a', 'HTML')`,
    );
    await queryRunner.query(
      `INSERT INTO "soft-skills" (id, description) VALUES ('1d1dbb90-198a-4ac6-93c0-0546cdb5c991', 'CSS')`,
    );
    await queryRunner.query(
      `INSERT INTO "soft-skills" (id, description) VALUES ('7ff348df-0aee-479c-b1aa-79e3bd9f4264', 'JavaScript')`,
    );
    await queryRunner.query(
      `INSERT INTO "soft-skills" (id, description) VALUES ('7a1c6ecf-6a95-47fd-b4a6-4c52ed7d4405', 'TypeScript')`,
    );
    await queryRunner.query(
      `INSERT INTO "soft-skills" (id, description) VALUES ('b45311a2-1ebc-4dad-a35f-106e7d236617', 'SQL')`,
    );
    await queryRunner.query(
      `INSERT INTO "soft-skills" (id, description) VALUES ('90994911-febd-4bda-8453-67636a2e07fb', 'Java')`,
    );
    await queryRunner.query(
      `INSERT INTO "soft-skills" (id, description) VALUES ('3c59bf04-b3f2-4229-b3c5-77d53abf4e71', 'ReactJS')`,
    );
    await queryRunner.query(
      `INSERT INTO "soft-skills" (id, description) VALUES ('015607ca-7a02-494a-8e9c-92521016758f', 'React Native')`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
