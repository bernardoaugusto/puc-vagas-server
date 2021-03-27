import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableUserAndUserToken1616545281030 implements MigrationInterface {
    name = 'CreateTableUserAndUserToken1616545281030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_token" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "users_token" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_token" ADD CONSTRAINT "FK_8210de8425b46ee73aab1415570" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_token" DROP CONSTRAINT "FK_8210de8425b46ee73aab1415570"`);
        await queryRunner.query(`ALTER TABLE "users_token" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "users_token" ADD "user_id" character varying NOT NULL`);
    }

}
