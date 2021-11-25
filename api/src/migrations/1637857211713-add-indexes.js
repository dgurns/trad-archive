const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class addIndexes1637857211713 {
	name = "addIndexes1637857211713";

	async up(queryRunner) {
		await queryRunner.query(
			`CREATE INDEX IF NOT EXISTS "idx_gin_collection_search" ON "public"."collection" ("name", "aliases", "description") `
		);
		await queryRunner.query(
			`CREATE INDEX IF NOT EXISTS "idx_gin_tune_search" ON "public"."tune" ("name", "aliases") `
		);
		await queryRunner.query(
			`CREATE INDEX IF NOT EXISTS "idx_gin_place_search" ON "public"."place" ("name", "aliases", "description") `
		);
		await queryRunner.query(
			`CREATE INDEX IF NOT EXISTS "idx_gin_instrument_search" ON "public"."instrument" ("name", "aliases", "description") `
		);
		await queryRunner.query(
			`CREATE INDEX IF NOT EXISTS "idx_gin_person_search" ON "public"."person" ("name", "aliases", "description") `
		);
		await queryRunner.query(
			`CREATE INDEX IF NOT EXISTS "idx_gin_audio_item_search" ON "public"."audio_item" ("name", "aliases", "description") `
		);
	}

	async down(queryRunner) {
		await queryRunner.query(`DROP INDEX "public"."idx_gin_audio_item_search"`);
		await queryRunner.query(`DROP INDEX "public"."idx_gin_person_search"`);
		await queryRunner.query(`DROP INDEX "public"."idx_gin_instrument_search"`);
		await queryRunner.query(`DROP INDEX "public"."idx_gin_place_search"`);
		await queryRunner.query(`DROP INDEX "public"."idx_gin_tune_search"`);
		await queryRunner.query(`DROP INDEX "public"."idx_gin_collection_search"`);
	}
};
