import {MigrationInterface, QueryRunner} from "typeorm";

export class PriorityForSkills1623335117147 implements MigrationInterface {
    name = 'PriorityForSkills1623335117147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hard-skills" ADD "priority" integer`);
        await queryRunner.query(`ALTER TABLE "vacancy-soft-skills" ADD "priority" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vacancy-soft-skills" DROP COLUMN "priority"`);
        await queryRunner.query(`ALTER TABLE "hard-skills" DROP COLUMN "priority"`);
    }

}
