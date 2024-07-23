import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCallsTable1721765291817 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS calls(
        id SERIAL PRIMARY KEY,
        "callSid" varchar,
        called varchar,
        direction varchar,
        "callerCountry" varchar,
        "toCountry" varchar,
        "to" varchar,
        "fromNumber" varchar,
        "accountSid" varchar,
        caller varchar,
        "recordingUrl" varchar DEFAULT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS calls`);
  }
}
