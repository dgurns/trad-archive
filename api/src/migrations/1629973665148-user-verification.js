const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class userVerification1629973665148 {
    name = 'userVerification1629973665148'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."person" ADD "verifiedUserId" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "copyrightPermissionStatus" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "verifiedPersonId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD CONSTRAINT "UQ_8c5d518abd1527f072059750371" UNIQUE ("verifiedPersonId")`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD CONSTRAINT "FK_8c5d518abd1527f072059750371" FOREIGN KEY ("verifiedPersonId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP CONSTRAINT "FK_8c5d518abd1527f072059750371"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP CONSTRAINT "UQ_8c5d518abd1527f072059750371"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "verifiedPersonId"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "copyrightPermissionStatus"`);
        await queryRunner.query(`ALTER TABLE "public"."person" DROP COLUMN "verifiedUserId"`);
    }
}
