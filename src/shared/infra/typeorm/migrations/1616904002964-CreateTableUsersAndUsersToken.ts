import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableUsersAndUsersToken1616904002964 implements MigrationInterface {
    name = 'CreateTableUsersAndUsersToken1616904002964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "active" boolean NOT NULL DEFAULT true, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e03e90fb544adefa10a6c202188" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "identifier" character varying NOT NULL, "phone_number" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "is_contractor" boolean NOT NULL DEFAULT false, "is_teacher" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")); COMMENT ON COLUMN "users"."identifier" IS 'Pode ser CPF ou CNPJ'`);
        await queryRunner.query(`ALTER TABLE "users_token" ADD CONSTRAINT "FK_8210de8425b46ee73aab1415570" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_token" DROP CONSTRAINT "FK_8210de8425b46ee73aab1415570"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "users_token"`);
    }

}
