const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class fixVerificationJoins1629973982484 {
    name = 'fixVerificationJoins1629973982484'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."person" DROP COLUMN "verifiedUserId"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "verifiedPersonId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD CONSTRAINT "UQ_8c5d518abd1527f072059750371" UNIQUE ("verifiedPersonId")`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD CONSTRAINT "FK_8c5d518abd1527f072059750371" FOREIGN KEY ("verifiedPersonId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP CONSTRAINT "FK_8c5d518abd1527f072059750371"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP CONSTRAINT "UQ_8c5d518abd1527f072059750371"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "verifiedPersonId"`);
        await queryRunner.query(`ALTER TABLE "public"."person" ADD "verifiedUserId" character varying`);
    }
}
