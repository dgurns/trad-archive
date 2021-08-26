const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class removeVerificationJoins1629974344801 {
    name = 'removeVerificationJoins1629974344801'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP CONSTRAINT "FK_8c5d518abd1527f072059750371"`);
        await queryRunner.query(`CREATE TYPE "user_verification_request_status_enum" AS ENUM('PENDING', 'APPROVED', 'DENIED')`);
        await queryRunner.query(`CREATE TYPE "user_verification_request_copyrightpermissionstatus_enum" AS ENUM('FULL_NON_COMMERCIAL_GRANTED')`);
        await queryRunner.query(`CREATE TABLE "user_verification_request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "personId" uuid NOT NULL, "status" "user_verification_request_status_enum" DEFAULT 'PENDING', "copyrightPermissionStatus" "user_verification_request_copyrightpermissionstatus_enum", "imageS3Key" character varying NOT NULL, "createdByUserId" uuid NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedByUserId" uuid, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_87c3ada56b27e0cfb14c2743a11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_53084454fe18daf37ee9178f9f" ON "user_verification_request" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9d5468f9311beac142885d0a1e" ON "user_verification_request" ("personId") `);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP CONSTRAINT "UQ_8c5d518abd1527f072059750371"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "verifiedPersonId"`);
        await queryRunner.query(`ALTER TABLE "user_verification_request" ADD CONSTRAINT "FK_53084454fe18daf37ee9178f9f3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_verification_request" ADD CONSTRAINT "FK_9d5468f9311beac142885d0a1e2" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_verification_request" ADD CONSTRAINT "FK_520c63d10a642afdcf2a53066c1" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_verification_request" ADD CONSTRAINT "FK_5a984d5b690e62137f7b0de4d0f" FOREIGN KEY ("updatedByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_verification_request" DROP CONSTRAINT "FK_5a984d5b690e62137f7b0de4d0f"`);
        await queryRunner.query(`ALTER TABLE "user_verification_request" DROP CONSTRAINT "FK_520c63d10a642afdcf2a53066c1"`);
        await queryRunner.query(`ALTER TABLE "user_verification_request" DROP CONSTRAINT "FK_9d5468f9311beac142885d0a1e2"`);
        await queryRunner.query(`ALTER TABLE "user_verification_request" DROP CONSTRAINT "FK_53084454fe18daf37ee9178f9f3"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "verifiedPersonId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD CONSTRAINT "UQ_8c5d518abd1527f072059750371" UNIQUE ("verifiedPersonId")`);
        await queryRunner.query(`DROP INDEX "IDX_9d5468f9311beac142885d0a1e"`);
        await queryRunner.query(`DROP INDEX "IDX_53084454fe18daf37ee9178f9f"`);
        await queryRunner.query(`DROP TABLE "user_verification_request"`);
        await queryRunner.query(`DROP TYPE "user_verification_request_copyrightpermissionstatus_enum"`);
        await queryRunner.query(`DROP TYPE "user_verification_request_status_enum"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD CONSTRAINT "FK_8c5d518abd1527f072059750371" FOREIGN KEY ("verifiedPersonId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
