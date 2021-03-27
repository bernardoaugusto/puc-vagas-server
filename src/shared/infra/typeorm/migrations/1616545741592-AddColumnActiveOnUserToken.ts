import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnActiveOnUserToken1616545741592 implements MigrationInterface {
    name = 'AddColumnActiveOnUserToken1616545741592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_token" ADD "active" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_token" DROP COLUMN "active"`);
    }

}
