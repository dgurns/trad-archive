const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class renameCollectionEntryToSavedItem1631787486512 {
    name = 'renameCollectionEntryToSavedItem1631787486512'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "saved_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "audioItemId" uuid NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_caa9a4e273f8940a00dc3eb713f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "saved_item" ADD CONSTRAINT "FK_84b494b938aaf3e8768d675caa0" FOREIGN KEY ("audioItemId") REFERENCES "audio_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "saved_item" ADD CONSTRAINT "FK_10603d69cf642bd18e374adbe07" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "saved_item" DROP CONSTRAINT "FK_10603d69cf642bd18e374adbe07"`);
        await queryRunner.query(`ALTER TABLE "saved_item" DROP CONSTRAINT "FK_84b494b938aaf3e8768d675caa0"`);
        await queryRunner.query(`DROP TABLE "saved_item"`);
    }
}
