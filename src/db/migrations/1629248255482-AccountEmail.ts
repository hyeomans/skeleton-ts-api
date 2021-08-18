import { MigrationInterface, QueryRunner } from 'typeorm'

export class AccountEmail1629248255482 implements MigrationInterface {
  name = 'AccountEmail1629248255482'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE account_email (
            id          SERIAL        PRIMARY KEY, 
            email       TEXT          UNIQUE NOT NULL, 
            password    TEXT          NOT NULL,
            "accountId" INTEGER       NOT NULL, 
            created_at  TIMESTAMPTZ   NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at  TIMESTAMPTZ   NOT NULL DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_accountId FOREIGN KEY ("accountId") REFERENCES account(id) ON DELETE CASCADE
        )`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE account_email`)
  }
}
