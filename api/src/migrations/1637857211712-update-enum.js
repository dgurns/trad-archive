const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class updateEnum1637857211712 {
	name = "updateEnum1637857211712";

	async up(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "public"."audio_item" DROP COLUMN "entityType"`
		);
		await queryRunner.query(
			`CREATE TYPE "public"."audio_item_entitytype_enum" AS ENUM('AudioItem', 'Person', 'Instrument', 'Place', 'Tune', 'Collection')`
		);
		await queryRunner.query(
			`ALTER TABLE "public"."audio_item" ADD "entityType" "public"."audio_item_entitytype_enum" DEFAULT 'AudioItem'`
		);
		await queryRunner.query(
			`ALTER TABLE "public"."person" DROP COLUMN "entityType"`
		);
		await queryRunner.query(
			`CREATE TYPE "public"."person_entitytype_enum" AS ENUM('AudioItem', 'Person', 'Instrument', 'Place', 'Tune', 'Collection')`
		);
		await queryRunner.query(
			`ALTER TABLE "public"."person" ADD "entityType" "public"."person_entitytype_enum" DEFAULT 'Person'`
		);
		await queryRunner.query(
			`ALTER TABLE "public"."instrument" DROP COLUMN "entityType"`
		);
		await queryRunner.query(
			`CREATE TYPE "public"."instrument_entitytype_enum" AS ENUM('AudioItem', 'Person', 'Instrument', 'Place', 'Tune', 'Collection')`
		);
		await queryRunner.query(
			`ALTER TABLE "public"."instrument" ADD "entityType" "public"."instrument_entitytype_enum" DEFAULT 'Instrument'`
		);
		await queryRunner.query(
			`ALTER TABLE "public"."place" DROP COLUMN "entityType"`
		);
		await queryRunner.query(
			`CREATE TYPE "public"."place_entitytype_enum" AS ENUM('AudioItem', 'Person', 'Instrument', 'Place', 'Tune', 'Collection')`
		);
		await queryRunner.query(
			`ALTER TABLE "public"."place" ADD "entityType" "public"."place_entitytype_enum" DEFAULT 'Place'`
		);
		await queryRunner.query(
			`ALTER TABLE "public"."tune" DROP COLUMN "entityType"`
		);
		await queryRunner.query(
			`CREATE TYPE "public"."tune_entitytype_enum" AS ENUM('AudioItem', 'Person', 'Instrument', 'Place', 'Tune', 'Collection')`
		);
		await queryRunner.query(
			`ALTER TABLE "public"."tune" ADD "entityType" "public"."tune_entitytype_enum" DEFAULT 'Tune'`
		);
		await queryRunner.query(
			`ALTER TABLE "public"."collection" DROP COLUMN "entityType"`
		);
		await queryRunner.query(
			`CREATE TYPE "public"."collection_entitytype_enum" AS ENUM('AudioItem', 'Person', 'Instrument', 'Place', 'Tune', 'Collection')`
		);
		await queryRunner.query(
			`ALTER TABLE "public"."collection" ADD "entityType" "public"."collection_entitytype_enum" DEFAULT 'Collection'`
		);
	}

	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "public"."collection" DROP COLUMN "entityType"`
		);
		await queryRunner.query(`DROP TYPE "public"."collection_entitytype_enum"`);
		await queryRunner.query(
			`ALTER TABLE "public"."collection" ADD "entityType" character varying DEFAULT 'Collection'`
		);
		await queryRunner.query(
			`ALTER TABLE "public"."tune" DROP COLUMN "entityType"`
		);
		await queryRunner.query(`DROP TYPE "public"."tune_entitytype_enum"`);
		await queryRunner.query(
			`ALTER TABLE "public"."tune" ADD "entityType" character varying DEFAULT 'Tune'`
		);
		await queryRunner.query(
			`ALTER TABLE "public"."place" DROP COLUMN "entityType"`
		);
		await queryRunner.query(`DROP TYPE "public"."place_entitytype_enum"`);
		await queryRunner.query(
			`ALTER TABLE "public"."place" ADD "entityType" character varying DEFAULT 'Place'`
		);
		await queryRunner.query(
			`ALTER TABLE "public"."instrument" DROP COLUMN "entityType"`
		);
		await queryRunner.query(`DROP TYPE "public"."instrument_entitytype_enum"`);
		await queryRunner.query(
			`ALTER TABLE "public"."instrument" ADD "entityType" character varying DEFAULT 'Instrument'`
		);
		await queryRunner.query(
			`ALTER TABLE "public"."person" DROP COLUMN "entityType"`
		);
		await queryRunner.query(`DROP TYPE "public"."person_entitytype_enum"`);
		await queryRunner.query(
			`ALTER TABLE "public"."person" ADD "entityType" character varying DEFAULT 'Person'`
		);
		await queryRunner.query(
			`ALTER TABLE "public"."audio_item" DROP COLUMN "entityType"`
		);
		await queryRunner.query(`DROP TYPE "public"."audio_item_entitytype_enum"`);
		await queryRunner.query(
			`ALTER TABLE "public"."audio_item" ADD "entityType" character varying DEFAULT 'AudioItem'`
		);
	}
};
