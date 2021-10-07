const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class verificationReqImageNull1632995772048 {
    name = 'verificationReqImageNull1632995772048'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."verification_request" ALTER COLUMN "imageS3Key" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."verification_request" ALTER COLUMN "imageS3Key" SET NOT NULL`);
    }
}
