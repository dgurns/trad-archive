const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class specifyIdFieldsForJoin1629383286780 {
    name = 'specifyIdFieldsForJoin1629383286780'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."comment" DROP CONSTRAINT "FK_6410acadbc3e2181ec41da5f356"`);
        await queryRunner.query(`ALTER TABLE "public"."comment" ALTER COLUMN "parentAudioItemId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."tag" DROP CONSTRAINT "FK_81757663fd3a737e9de086cd06b"`);
        await queryRunner.query(`ALTER TABLE "public"."tag" ALTER COLUMN "relationshipId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."collection_entry" DROP CONSTRAINT "FK_aae3f0f16b774b37e7415a4a181"`);
        await queryRunner.query(`ALTER TABLE "public"."collection_entry" DROP CONSTRAINT "FK_74277e7acbe486b0ebeca5c1d51"`);
        await queryRunner.query(`ALTER TABLE "public"."collection_entry" ALTER COLUMN "audioItemId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."collection_entry" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."comment" ADD CONSTRAINT "FK_6410acadbc3e2181ec41da5f356" FOREIGN KEY ("parentAudioItemId") REFERENCES "audio_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."tag" ADD CONSTRAINT "FK_81757663fd3a737e9de086cd06b" FOREIGN KEY ("relationshipId") REFERENCES "relationship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."collection_entry" ADD CONSTRAINT "FK_aae3f0f16b774b37e7415a4a181" FOREIGN KEY ("audioItemId") REFERENCES "audio_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."collection_entry" ADD CONSTRAINT "FK_74277e7acbe486b0ebeca5c1d51" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."collection_entry" DROP CONSTRAINT "FK_74277e7acbe486b0ebeca5c1d51"`);
        await queryRunner.query(`ALTER TABLE "public"."collection_entry" DROP CONSTRAINT "FK_aae3f0f16b774b37e7415a4a181"`);
        await queryRunner.query(`ALTER TABLE "public"."tag" DROP CONSTRAINT "FK_81757663fd3a737e9de086cd06b"`);
        await queryRunner.query(`ALTER TABLE "public"."comment" DROP CONSTRAINT "FK_6410acadbc3e2181ec41da5f356"`);
        await queryRunner.query(`ALTER TABLE "public"."collection_entry" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."collection_entry" ALTER COLUMN "audioItemId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."collection_entry" ADD CONSTRAINT "FK_74277e7acbe486b0ebeca5c1d51" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."collection_entry" ADD CONSTRAINT "FK_aae3f0f16b774b37e7415a4a181" FOREIGN KEY ("audioItemId") REFERENCES "audio_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."tag" ALTER COLUMN "relationshipId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."tag" ADD CONSTRAINT "FK_81757663fd3a737e9de086cd06b" FOREIGN KEY ("relationshipId") REFERENCES "relationship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."comment" ALTER COLUMN "parentAudioItemId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."comment" ADD CONSTRAINT "FK_6410acadbc3e2181ec41da5f356" FOREIGN KEY ("parentAudioItemId") REFERENCES "audio_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
