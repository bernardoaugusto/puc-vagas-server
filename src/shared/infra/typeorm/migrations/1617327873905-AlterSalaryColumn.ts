import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterSalaryColumn1617327873905 implements MigrationInterface {
    name = 'AlterSalaryColumn1617327873905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vacancies" DROP COLUMN "salary_range"`);
        await queryRunner.query(`ALTER TABLE "vacancies" ADD "start_salary_range" character varying`);
        await queryRunner.query(`ALTER TABLE "vacancies" ADD "end_salary_range" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vacancies" DROP COLUMN "end_salary_range"`);
        await queryRunner.query(`ALTER TABLE "vacancies" DROP COLUMN "start_salary_range"`);
        await queryRunner.query(`ALTER TABLE "vacancies" ADD "salary_range" character varying`);
    }

}
