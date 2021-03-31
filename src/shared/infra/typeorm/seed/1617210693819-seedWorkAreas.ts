/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedWorkAreas1617210693819 implements MigrationInterface {
  name = 'seedWorkAreas1617210693819';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "work-areas" (id, description) values ('b822eb71-9b13-4159-b7ed-757c568bf251', 'Tecnologia')`,
    );
    await queryRunner.query(
      `INSERT INTO "work-areas" (id, description) values ('daae32c9-92e8-4dae-b233-5b3338120e4b', 'Administração, negócios e serviços')`,
    );
    await queryRunner.query(
      `INSERT INTO "work-areas" (id, description) values ('af457880-2fb7-44f0-b2f7-b485a02b2075', 'Artes e Design')`,
    );
    await queryRunner.query(
      `INSERT INTO "work-areas" (id, description) values ('a154cb9c-4e28-4aa0-81a8-7edbf43fce44', 'Ciências Biológicas e da Terra')`,
    );
    await queryRunner.query(
      `INSERT INTO "work-areas" (id, description) values ('40a41c87-226b-4b10-828b-cdae29b946a6', 'Ciências Sociais e Humanas')`,
    );
    await queryRunner.query(
      `INSERT INTO "work-areas" (id, description) values ('c83d7f4a-6f67-43a4-b031-d26d96c96d3c', 'Comunicação e Informação')`,
    );
    await queryRunner.query(
      `INSERT INTO "work-areas" (id, description) values ('a5bb9b70-9dbd-4b1f-805f-d0571639d6f1', 'Engenharia e Produção')`,
    );
    await queryRunner.query(
      `INSERT INTO "work-areas" (id, description) values ('8c7d167b-938b-49f4-9490-098fbda5fa3a', 'Saúde e Bem-estar')`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
