const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class changeEnumCapitalization1629975741734 {
    name = 'changeEnumCapitalization1629975741734'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."user_verification_request" DROP CONSTRAINT "FK_53084454fe18daf37ee9178f9f3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_53084454fe18daf37ee9178f9f"`);
        await queryRunner.query(`ALTER TABLE "public"."user_verification_request" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TYPE "public"."user_verification_request_status_enum" RENAME TO "user_verification_request_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_verification_request_status_enum" AS ENUM('Pending', 'Approved', 'Denied')`);
        await queryRunner.query(`ALTER TABLE "public"."user_verification_request" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "public"."user_verification_request" ALTER COLUMN "status" TYPE "public"."user_verification_request_status_enum" USING "status"::"text"::"public"."user_verification_request_status_enum"`);
        await queryRunner.query(`ALTER TABLE "public"."user_verification_request" ALTER COLUMN "status" SET DEFAULT 'Pending'`);
        await queryRunner.query(`DROP TYPE "public"."user_verification_request_status_enum_old"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."user_verification_request_status_enum_old" AS ENUM('PENDING', 'APPROVED', 'DENIED')`);
        await queryRunner.query(`ALTER TABLE "public"."user_verification_request" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "public"."user_verification_request" ALTER COLUMN "status" TYPE "public"."user_verification_request_status_enum_old" USING "status"::"text"::"public"."user_verification_request_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "public"."user_verification_request" ALTER COLUMN "status" SET DEFAULT 'PENDING'`);
        await queryRunner.query(`DROP TYPE "public"."user_verification_request_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_verification_request_status_enum_old" RENAME TO "user_verification_request_status_enum"`);
        await queryRunner.query(`ALTER TABLE "public"."user_verification_request" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_53084454fe18daf37ee9178f9f" ON "public"."user_verification_request" ("userId") `);
        await queryRunner.query(`ALTER TABLE "public"."user_verification_request" ADD CONSTRAINT "FK_53084454fe18daf37ee9178f9f3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
