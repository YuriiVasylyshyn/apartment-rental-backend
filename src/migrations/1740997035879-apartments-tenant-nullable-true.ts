import { MigrationInterface, QueryRunner } from 'typeorm';

export class ApartmentsTenantNullableTrue1740997035879 implements MigrationInterface {
  public name = 'ApartmentsTenantNullableTrue1740997035879';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "apartments"."apartment" DROP CONSTRAINT "FK_02b756c2cc0a193a768b612a2f7"`);
    await queryRunner.query(`ALTER TABLE "apartments"."apartment" DROP CONSTRAINT "FK_a1c07701841cf36543cc00b67ff"`);
    await queryRunner.query(`ALTER TABLE "apartments"."apartment" ALTER COLUMN "tenant_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "apartments"."apartment" ADD CONSTRAINT "FK_02b756c2cc0a193a768b612a2f7" FOREIGN KEY ("owner_id") REFERENCES "users"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "apartments"."apartment" ADD CONSTRAINT "FK_a1c07701841cf36543cc00b67ff" FOREIGN KEY ("tenant_id") REFERENCES "users"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "apartments"."apartment" DROP CONSTRAINT "FK_a1c07701841cf36543cc00b67ff"`);
    await queryRunner.query(`ALTER TABLE "apartments"."apartment" DROP CONSTRAINT "FK_02b756c2cc0a193a768b612a2f7"`);
    await queryRunner.query(`ALTER TABLE "apartments"."apartment" ALTER COLUMN "tenant_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "apartments"."apartment" ADD CONSTRAINT "FK_a1c07701841cf36543cc00b67ff" FOREIGN KEY ("tenant_id") REFERENCES "users"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "apartments"."apartment" ADD CONSTRAINT "FK_02b756c2cc0a193a768b612a2f7" FOREIGN KEY ("owner_id") REFERENCES "users"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
