const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class addItmaAtomSlugAudioItem1631807775156 {
    name = 'addItmaAtomSlugAudioItem1631807775156'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."audio_item" ADD "itmaAtomSlug" character varying`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."audio_item" DROP COLUMN "itmaAtomSlug"`);
    }
}
