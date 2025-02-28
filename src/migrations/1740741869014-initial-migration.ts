import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1740741869014 implements MigrationInterface {
  name = 'InitialMigration1740741869014';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createSchema('users', true);
    await queryRunner.createSchema('apartments', true);
    await queryRunner.query(`CREATE TYPE "users"."user_role_enum" AS ENUM('tenant', 'landlord')`);
    await queryRunner.query(
      `CREATE TABLE "users"."user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying(255), "email" character varying(255), "password" text, "role" "users"."user_role_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "apartments"."apartment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(100) NOT NULL, "description" text, "country" character varying(100) NOT NULL, "city" character varying(100) NOT NULL, "state" character varying(100), "price" double precision NOT NULL DEFAULT '0', "currency" character varying(10) NOT NULL DEFAULT 'USD', "rooms" integer, "area_sqm" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "owner_id" uuid NOT NULL, "tenant_id" uuid NOT NULL, CONSTRAINT "PK_c3d874d9924f6f16223162b3d3a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "apartments"."apartment" ADD CONSTRAINT "FK_02b756c2cc0a193a768b612a2f7" FOREIGN KEY ("owner_id") REFERENCES "users"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "apartments"."apartment" ADD CONSTRAINT "FK_a1c07701841cf36543cc00b67ff" FOREIGN KEY ("tenant_id") REFERENCES "users"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "apartments"."apartment" DROP CONSTRAINT "FK_a1c07701841cf36543cc00b67ff"`);
    await queryRunner.query(`ALTER TABLE "apartments"."apartment" DROP CONSTRAINT "FK_02b756c2cc0a193a768b612a2f7"`);
    await queryRunner.query(`DROP TABLE "apartments"."apartment"`);
    await queryRunner.query(`DROP TABLE "users"."user"`);
    await queryRunner.query(`DROP TYPE "users"."user_role_enum"`);
    await queryRunner.dropSchema('apartments', true);
    await queryRunner.dropSchema('users', true);
  }
}
