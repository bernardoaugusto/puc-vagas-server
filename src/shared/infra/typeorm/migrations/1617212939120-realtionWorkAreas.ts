/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class realtionWorkAreas1617212939120 implements MigrationInterface {
  name = 'realtionWorkAreas1617212939120';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "vacancies_work_areas_work-areas" ("vacanciesId" uuid NOT NULL, "workAreasId" uuid NOT NULL, CONSTRAINT "PK_f959b36285805effc3e0c44ac5c" PRIMARY KEY ("vacanciesId", "workAreasId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9298b1e7dc44c8acf92f12bb08" ON "vacancies_work_areas_work-areas" ("vacanciesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a65d88816bf423cf72b6b85fc6" ON "vacancies_work_areas_work-areas" ("workAreasId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "users_work_areas_work-areas" ("usersId" uuid NOT NULL, "workAreasId" uuid NOT NULL, CONSTRAINT "PK_a0cff3cf6398e11d7fadb3b31c1" PRIMARY KEY ("usersId", "workAreasId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4743073650680f5bbdbdf31832" ON "users_work_areas_work-areas" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6498de984f18fe92c0621ffb04" ON "users_work_areas_work-areas" ("workAreasId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "vacancies_work_areas_work-areas" ADD CONSTRAINT "FK_9298b1e7dc44c8acf92f12bb082" FOREIGN KEY ("vacanciesId") REFERENCES "vacancies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vacancies_work_areas_work-areas" ADD CONSTRAINT "FK_a65d88816bf423cf72b6b85fc62" FOREIGN KEY ("workAreasId") REFERENCES "work-areas"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_work_areas_work-areas" ADD CONSTRAINT "FK_4743073650680f5bbdbdf318321" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_work_areas_work-areas" ADD CONSTRAINT "FK_6498de984f18fe92c0621ffb041" FOREIGN KEY ("workAreasId") REFERENCES "work-areas"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_work_areas_work-areas" DROP CONSTRAINT "FK_6498de984f18fe92c0621ffb041"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_work_areas_work-areas" DROP CONSTRAINT "FK_4743073650680f5bbdbdf318321"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vacancies_work_areas_work-areas" DROP CONSTRAINT "FK_a65d88816bf423cf72b6b85fc62"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vacancies_work_areas_work-areas" DROP CONSTRAINT "FK_9298b1e7dc44c8acf92f12bb082"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_6498de984f18fe92c0621ffb04"`);
    await queryRunner.query(`DROP INDEX "IDX_4743073650680f5bbdbdf31832"`);
    await queryRunner.query(`DROP TABLE "users_work_areas_work-areas"`);
    await queryRunner.query(`DROP INDEX "IDX_a65d88816bf423cf72b6b85fc6"`);
    await queryRunner.query(`DROP INDEX "IDX_9298b1e7dc44c8acf92f12bb08"`);
    await queryRunner.query(`DROP TABLE "vacancies_work_areas_work-areas"`);
  }
}
