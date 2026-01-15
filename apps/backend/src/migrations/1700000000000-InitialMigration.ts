import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1700000000000 implements MigrationInterface {
  name = 'InitialMigration1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Users table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "user" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" varchar NOT NULL,
        "email" varchar UNIQUE NOT NULL,
        "username" varchar UNIQUE,
        "password" varchar NOT NULL,
        "role" varchar NOT NULL DEFAULT 'user' CHECK ("role" IN ('admin', 'user', 'guest'))
      )
    `);

    // Cloud Resources table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "cloud_resource" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "userId" uuid NOT NULL,
        "name" varchar NOT NULL,
        "type" varchar NOT NULL CHECK ("type" IN ('EC2', 'S3', 'RDS', 'Lambda')),
        "provider" varchar NOT NULL DEFAULT 'mock' CHECK ("provider" IN ('aws', 'azure', 'gcp', 'mock')),
        "status" varchar NOT NULL DEFAULT 'running' CHECK ("status" IN ('running', 'stopped', 'terminated', 'error')),
        "cpu" float NOT NULL,
        "ram" float NOT NULL,
        "storage" float NOT NULL,
        "region" varchar,
        "ip" varchar,
        "createdAt" timestamp NOT NULL DEFAULT now(),
        CONSTRAINT "FK_cloud_resource_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE
      )
    `);

    // Deployments table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "deployment" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "userId" uuid NOT NULL,
        "resourceId" uuid NOT NULL,
        "name" varchar,
        "version" varchar NOT NULL,
        "action" varchar NOT NULL CHECK ("action" IN ('restart', 'scale-up', 'scale-down', 'update')),
        "status" varchar NOT NULL DEFAULT 'pending' CHECK ("status" IN ('pending', 'in-progress', 'successful', 'failed', 'rolling-back', 'rolled-back')),
        "previousConfig" jsonb,
        "rollbackConfig" jsonb,
        "transitions" jsonb,
        "startedAt" timestamp NOT NULL DEFAULT now(),
        "completedAt" timestamp,
        "timestamp" timestamp NOT NULL DEFAULT now(),
        CONSTRAINT "FK_deployment_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_deployment_resource" FOREIGN KEY ("resourceId") REFERENCES "cloud_resource"("id") ON DELETE CASCADE
      )
    `);

    // Alerts table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "alert" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "userId" uuid NOT NULL,
        "resourceId" uuid NOT NULL,
        "type" varchar NOT NULL CHECK ("type" IN ('CPU', 'RAM', 'Storage', 'Network')),
        "threshold" float NOT NULL,
        "triggeredAt" timestamp,
        CONSTRAINT "FK_alert_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_alert_resource" FOREIGN KEY ("resourceId") REFERENCES "cloud_resource"("id") ON DELETE CASCADE
      )
    `);

    // Invoices table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "invoice" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "userId" uuid NOT NULL,
        "date" varchar NOT NULL,
        "amount" decimal(10,2) NOT NULL,
        "status" varchar NOT NULL CHECK ("status" IN ('Paid', 'Pending', 'Overdue')),
        "pdfUrl" varchar,
        "createdAt" timestamp NOT NULL DEFAULT now()
      )
    `);

    // Monitoring Logs table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "monitoring_log" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "userId" uuid NOT NULL,
        "level" varchar NOT NULL,
        "message" varchar NOT NULL,
        "source" varchar,
        "timestamp" timestamp NOT NULL DEFAULT now()
      )
    `);

    // Cost History table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "cost_history" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "userId" uuid NOT NULL,
        "resourceId" uuid NOT NULL,
        "hourlyCost" decimal(10,4) NOT NULL,
        "dailyCost" decimal(10,4) NOT NULL,
        "monthlyCost" decimal(10,4) NOT NULL,
        "cpuUtilization" float NOT NULL,
        "memoryUtilization" float NOT NULL,
        "storageUtilization" float NOT NULL,
        "networkIn" float NOT NULL,
        "networkOut" float NOT NULL,
        "activeConnections" integer NOT NULL,
        "metadata" jsonb,
        "timestamp" timestamp NOT NULL DEFAULT now(),
        CONSTRAINT "FK_cost_history_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_cost_history_resource" FOREIGN KEY ("resourceId") REFERENCES "cloud_resource"("id") ON DELETE CASCADE
      )
    `);

    // Teams table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "team" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" varchar NOT NULL,
        "ownerId" uuid NOT NULL,
        CONSTRAINT "FK_team_owner" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE
      )
    `);

    // Team Members table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "team_member" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "teamId" uuid NOT NULL,
        "userId" uuid NOT NULL,
        "status" varchar NOT NULL DEFAULT 'pending' CHECK ("status" IN ('pending', 'accepted', 'declined')),
        CONSTRAINT "FK_team_member_team" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_team_member_user" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE
      )
    `);

    // Create indexes
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_cost_history_resource_timestamp" ON "cost_history" ("resourceId", "timestamp")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_cost_history_user_timestamp" ON "cost_history" ("userId", "timestamp")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_cloud_resource_user" ON "cloud_resource" ("userId")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_deployment_user" ON "deployment" ("userId")`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_deployment_resource" ON "deployment" ("resourceId")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "team_member"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "team"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "cost_history"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "monitoring_log"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "invoice"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "alert"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "deployment"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "cloud_resource"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "user"`);
  }
}
