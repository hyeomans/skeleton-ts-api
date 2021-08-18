import { MigrationInterface, QueryRunner } from 'typeorm'

export class Accounts1629247252172 implements MigrationInterface {
  name = 'Accounts1629247252172'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "account_status_enum" AS ENUM('created', 'confirmed', 'invited', 'blocked')
    `)

    await queryRunner.query(`
        CREATE TABLE account(
            id          SERIAL                 PRIMARY KEY,
            email       TEXT                   UNIQUE NOT NULL, 
            status      "account_status_enum"  NOT NULL CHECK("status" IN ('created', 'confirmed', 'invited', 'blocked')) DEFAULT 'created',
            created_at  TIMESTAMPTZ            NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at  TIMESTAMPTZ            NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "account"`)
    await queryRunner.query(`DROP TYPE "account_status_enum"`)
  }
}
