import { MigrationInterface, QueryRunner } from "typeorm";

export class createSchema1628169885061 implements MigrationInterface {
	name = "createSchema1628169885061";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TYPE "user_permissions_enum" AS ENUM('USER', 'ADMIN')`
		);
		await queryRunner.query(
			`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "permissions" "user_permissions_enum" array NOT NULL DEFAULT '{USER}', "email" character varying NOT NULL, "username" character varying NOT NULL, "autoLoginTokenHashed" character varying, "autoLoginTokenExpiry" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "user" ("username") `
		);
		await queryRunner.query(
			`CREATE TYPE "person_status_enum" AS ENUM('PUBLISHED', 'TAKEN_DOWN')`
		);
		await queryRunner.query(
			`CREATE TABLE "person" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying NOT NULL, "aliases" character varying, "description" character varying, "status" "person_status_enum" NOT NULL DEFAULT 'PUBLISHED', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "entityType" character varying DEFAULT 'Person', "firstName" character varying NOT NULL, "middleName" character varying, "lastName" character varying NOT NULL, "createdByUserId" uuid, "updatedByUserId" uuid, CONSTRAINT "UQ_48e444390904f250a3b20e4d575" UNIQUE ("slug"), CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_27c811883af9f3fefe79892f02" ON "person" ("name") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_48e444390904f250a3b20e4d57" ON "person" ("slug") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_62b704d492298158581b75b439" ON "person" ("aliases") `
		);
		await queryRunner.query(
			`CREATE TYPE "instrument_status_enum" AS ENUM('PUBLISHED', 'TAKEN_DOWN')`
		);
		await queryRunner.query(
			`CREATE TABLE "instrument" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying NOT NULL, "aliases" character varying, "description" character varying, "status" "instrument_status_enum" NOT NULL DEFAULT 'PUBLISHED', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "entityType" character varying DEFAULT 'Instrument', "createdByUserId" uuid, "updatedByUserId" uuid, CONSTRAINT "UQ_9281cb956dba2fe2b2006f1cbf0" UNIQUE ("slug"), CONSTRAINT "PK_1707dc7e7c2845211b38bef3d29" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_efda620b8e7e274a712072e2af" ON "instrument" ("name") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_9281cb956dba2fe2b2006f1cbf" ON "instrument" ("slug") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_1c6d698eecbc29074530d1b15b" ON "instrument" ("aliases") `
		);
		await queryRunner.query(
			`CREATE TYPE "place_status_enum" AS ENUM('PUBLISHED', 'TAKEN_DOWN')`
		);
		await queryRunner.query(
			`CREATE TABLE "place" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying NOT NULL, "aliases" character varying, "description" character varying, "status" "place_status_enum" NOT NULL DEFAULT 'PUBLISHED', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "entityType" character varying DEFAULT 'Place', "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "createdByUserId" uuid, "updatedByUserId" uuid, CONSTRAINT "UQ_1443badb6c7af8994264958b4d3" UNIQUE ("slug"), CONSTRAINT "PK_96ab91d43aa89c5de1b59ee7cca" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_493d5e591af774a1587d363fb8" ON "place" ("name") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_1443badb6c7af8994264958b4d" ON "place" ("slug") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_555314762aec40216993528c63" ON "place" ("aliases") `
		);
		await queryRunner.query(
			`CREATE TYPE "tune_status_enum" AS ENUM('PUBLISHED', 'TAKEN_DOWN')`
		);
		await queryRunner.query(
			`CREATE TABLE "tune" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying NOT NULL, "aliases" character varying, "description" character varying, "status" "tune_status_enum" NOT NULL DEFAULT 'PUBLISHED', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "entityType" character varying DEFAULT 'Tune', "theSessionTuneId" character varying NOT NULL, "type" character varying, "meter" character varying, "mode" character varying, "abc" character varying, "createdByUserId" uuid, "updatedByUserId" uuid, CONSTRAINT "UQ_0c40b0dbe742aa63a6bb2b5231f" UNIQUE ("slug"), CONSTRAINT "PK_be0c38b9a8505bee768ed90171e" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_03ee6f8829912ff0af96eb1de9" ON "tune" ("name") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_0c40b0dbe742aa63a6bb2b5231" ON "tune" ("slug") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_a0031b16785b3b7dfed915e249" ON "tune" ("aliases") `
		);
		await queryRunner.query(
			`CREATE TYPE "relationship_subjectentitytype_enum" AS ENUM('AudioItem', 'Person', 'Instrument', 'Place', 'Tune')`
		);
		await queryRunner.query(
			`CREATE TYPE "relationship_objectentitytype_enum" AS ENUM('AudioItem', 'Person', 'Instrument', 'Place', 'Tune')`
		);
		await queryRunner.query(
			`CREATE TABLE "relationship" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "subjectEntityType" "relationship_subjectentitytype_enum" NOT NULL, "objectEntityType" "relationship_objectentitytype_enum" NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdByUserId" uuid, CONSTRAINT "PK_67eb56a3f16da3d901a8ae446a6" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subjectTimeMarkerSeconds" integer, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "relationshipId" uuid, "subjectAudioItemId" uuid, "subjectPersonId" uuid, "subjectInstrumentId" uuid, "subjectPlaceId" uuid, "subjectTuneId" uuid, "objectAudioItemId" uuid, "objectPersonId" uuid, "objectInstrumentId" uuid, "objectPlaceId" uuid, "objectTuneId" uuid, "createdByUserId" uuid, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "parentAudioItemId" uuid, "createdByUserId" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TYPE "audio_item_status_enum" AS ENUM('PUBLISHED', 'TAKEN_DOWN')`
		);
		await queryRunner.query(
			`CREATE TABLE "audio_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying NOT NULL, "aliases" character varying, "description" character varying, "status" "audio_item_status_enum" NOT NULL DEFAULT 'PUBLISHED', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "entityType" character varying DEFAULT 'AudioItem', "urlSource" character varying, "createdByUserId" uuid, "updatedByUserId" uuid, CONSTRAINT "UQ_d5eca2db8a788b6481cf843c314" UNIQUE ("slug"), CONSTRAINT "PK_59e6b90f24be88d65d611e1d09e" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_17c0f6ea1cd539cbd513a02926" ON "audio_item" ("name") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_d5eca2db8a788b6481cf843c31" ON "audio_item" ("slug") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_012eb80e4106a106419e453a6a" ON "audio_item" ("aliases") `
		);
		await queryRunner.query(
			`CREATE TABLE "collection_entry" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "audioItemId" uuid, "userId" uuid, CONSTRAINT "PK_a8d0a8055a02726d9a17918a24c" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TYPE "takedown_request_type_enum" AS ENUM('COPYRIGHT', 'PERFORMER')`
		);
		await queryRunner.query(
			`CREATE TYPE "takedown_request_status_enum" AS ENUM('PENDING', 'APPROVED', 'DENIED')`
		);
		await queryRunner.query(
			`CREATE TABLE "takedown_request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "takedown_request_type_enum" NOT NULL, "message" character varying NOT NULL, "status" "takedown_request_status_enum" DEFAULT 'PENDING', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "audioItemId" uuid, "createdByUserId" uuid, "updatedByUserId" uuid, CONSTRAINT "PK_4fd9aa6d0c77aaf3362f97c5952" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_4b57e3d008abb21714be3c7b22" ON "takedown_request" ("audioItemId") `
		);
		await queryRunner.query(
			`ALTER TABLE "person" ADD CONSTRAINT "FK_da028e48c59764ef85ca139857d" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "person" ADD CONSTRAINT "FK_d870176565d51364e84a24f8cbc" FOREIGN KEY ("updatedByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "instrument" ADD CONSTRAINT "FK_b3a84679aa17201a72f8cef5a66" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "instrument" ADD CONSTRAINT "FK_fbc83e649ff982da5fc22f47a1a" FOREIGN KEY ("updatedByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "place" ADD CONSTRAINT "FK_62e3dabd3294e1e769121c1c24f" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "place" ADD CONSTRAINT "FK_be3a100f740807d44e2243304be" FOREIGN KEY ("updatedByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "tune" ADD CONSTRAINT "FK_622835af391f05750fe194eb15b" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "tune" ADD CONSTRAINT "FK_e29a2fc6cb1af1779a7ba55a417" FOREIGN KEY ("updatedByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "relationship" ADD CONSTRAINT "FK_b067abd48e5f6212730eea141a4" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "tag" ADD CONSTRAINT "FK_81757663fd3a737e9de086cd06b" FOREIGN KEY ("relationshipId") REFERENCES "relationship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "tag" ADD CONSTRAINT "FK_23e0827a99ccfc433dded4e9e3d" FOREIGN KEY ("subjectAudioItemId") REFERENCES "audio_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "tag" ADD CONSTRAINT "FK_731faf8c98b32a8810f1e842e03" FOREIGN KEY ("subjectPersonId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "tag" ADD CONSTRAINT "FK_fba149c3a638db60488f4f952aa" FOREIGN KEY ("subjectInstrumentId") REFERENCES "instrument"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "tag" ADD CONSTRAINT "FK_8ae3ee2b36549c32ac8a368fa60" FOREIGN KEY ("subjectPlaceId") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "tag" ADD CONSTRAINT "FK_39d5e10a46dcd680427772058c4" FOREIGN KEY ("subjectTuneId") REFERENCES "tune"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "tag" ADD CONSTRAINT "FK_0c9359d8c826bc7a2af8d01f2e1" FOREIGN KEY ("objectAudioItemId") REFERENCES "audio_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "tag" ADD CONSTRAINT "FK_6486271b16dd87223573761182e" FOREIGN KEY ("objectPersonId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "tag" ADD CONSTRAINT "FK_2002bd674353a6874f75a54c5a7" FOREIGN KEY ("objectInstrumentId") REFERENCES "instrument"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "tag" ADD CONSTRAINT "FK_7884c6a74df91f1f452e5106736" FOREIGN KEY ("objectPlaceId") REFERENCES "place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "tag" ADD CONSTRAINT "FK_0d8fb4ad60c15a913c8a9f7ff23" FOREIGN KEY ("objectTuneId") REFERENCES "tune"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "tag" ADD CONSTRAINT "FK_beb25937e143892aa1ed9b90745" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "comment" ADD CONSTRAINT "FK_6410acadbc3e2181ec41da5f356" FOREIGN KEY ("parentAudioItemId") REFERENCES "audio_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "comment" ADD CONSTRAINT "FK_c05bb6dfa077f32115b9d5265bb" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "audio_item" ADD CONSTRAINT "FK_1252a8627b756409999142aba4f" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "audio_item" ADD CONSTRAINT "FK_5a4c6c50d6e8426885c84438983" FOREIGN KEY ("updatedByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "collection_entry" ADD CONSTRAINT "FK_aae3f0f16b774b37e7415a4a181" FOREIGN KEY ("audioItemId") REFERENCES "audio_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "collection_entry" ADD CONSTRAINT "FK_74277e7acbe486b0ebeca5c1d51" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "takedown_request" ADD CONSTRAINT "FK_4b57e3d008abb21714be3c7b222" FOREIGN KEY ("audioItemId") REFERENCES "audio_item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "takedown_request" ADD CONSTRAINT "FK_6fe209d711991c1a196a887b636" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "takedown_request" ADD CONSTRAINT "FK_adb3bca8319b7c27dbf3ec38052" FOREIGN KEY ("updatedByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "takedown_request" DROP CONSTRAINT "FK_adb3bca8319b7c27dbf3ec38052"`
		);
		await queryRunner.query(
			`ALTER TABLE "takedown_request" DROP CONSTRAINT "FK_6fe209d711991c1a196a887b636"`
		);
		await queryRunner.query(
			`ALTER TABLE "takedown_request" DROP CONSTRAINT "FK_4b57e3d008abb21714be3c7b222"`
		);
		await queryRunner.query(
			`ALTER TABLE "collection_entry" DROP CONSTRAINT "FK_74277e7acbe486b0ebeca5c1d51"`
		);
		await queryRunner.query(
			`ALTER TABLE "collection_entry" DROP CONSTRAINT "FK_aae3f0f16b774b37e7415a4a181"`
		);
		await queryRunner.query(
			`ALTER TABLE "audio_item" DROP CONSTRAINT "FK_5a4c6c50d6e8426885c84438983"`
		);
		await queryRunner.query(
			`ALTER TABLE "audio_item" DROP CONSTRAINT "FK_1252a8627b756409999142aba4f"`
		);
		await queryRunner.query(
			`ALTER TABLE "comment" DROP CONSTRAINT "FK_c05bb6dfa077f32115b9d5265bb"`
		);
		await queryRunner.query(
			`ALTER TABLE "comment" DROP CONSTRAINT "FK_6410acadbc3e2181ec41da5f356"`
		);
		await queryRunner.query(
			`ALTER TABLE "tag" DROP CONSTRAINT "FK_beb25937e143892aa1ed9b90745"`
		);
		await queryRunner.query(
			`ALTER TABLE "tag" DROP CONSTRAINT "FK_0d8fb4ad60c15a913c8a9f7ff23"`
		);
		await queryRunner.query(
			`ALTER TABLE "tag" DROP CONSTRAINT "FK_7884c6a74df91f1f452e5106736"`
		);
		await queryRunner.query(
			`ALTER TABLE "tag" DROP CONSTRAINT "FK_2002bd674353a6874f75a54c5a7"`
		);
		await queryRunner.query(
			`ALTER TABLE "tag" DROP CONSTRAINT "FK_6486271b16dd87223573761182e"`
		);
		await queryRunner.query(
			`ALTER TABLE "tag" DROP CONSTRAINT "FK_0c9359d8c826bc7a2af8d01f2e1"`
		);
		await queryRunner.query(
			`ALTER TABLE "tag" DROP CONSTRAINT "FK_39d5e10a46dcd680427772058c4"`
		);
		await queryRunner.query(
			`ALTER TABLE "tag" DROP CONSTRAINT "FK_8ae3ee2b36549c32ac8a368fa60"`
		);
		await queryRunner.query(
			`ALTER TABLE "tag" DROP CONSTRAINT "FK_fba149c3a638db60488f4f952aa"`
		);
		await queryRunner.query(
			`ALTER TABLE "tag" DROP CONSTRAINT "FK_731faf8c98b32a8810f1e842e03"`
		);
		await queryRunner.query(
			`ALTER TABLE "tag" DROP CONSTRAINT "FK_23e0827a99ccfc433dded4e9e3d"`
		);
		await queryRunner.query(
			`ALTER TABLE "tag" DROP CONSTRAINT "FK_81757663fd3a737e9de086cd06b"`
		);
		await queryRunner.query(
			`ALTER TABLE "relationship" DROP CONSTRAINT "FK_b067abd48e5f6212730eea141a4"`
		);
		await queryRunner.query(
			`ALTER TABLE "tune" DROP CONSTRAINT "FK_e29a2fc6cb1af1779a7ba55a417"`
		);
		await queryRunner.query(
			`ALTER TABLE "tune" DROP CONSTRAINT "FK_622835af391f05750fe194eb15b"`
		);
		await queryRunner.query(
			`ALTER TABLE "place" DROP CONSTRAINT "FK_be3a100f740807d44e2243304be"`
		);
		await queryRunner.query(
			`ALTER TABLE "place" DROP CONSTRAINT "FK_62e3dabd3294e1e769121c1c24f"`
		);
		await queryRunner.query(
			`ALTER TABLE "instrument" DROP CONSTRAINT "FK_fbc83e649ff982da5fc22f47a1a"`
		);
		await queryRunner.query(
			`ALTER TABLE "instrument" DROP CONSTRAINT "FK_b3a84679aa17201a72f8cef5a66"`
		);
		await queryRunner.query(
			`ALTER TABLE "person" DROP CONSTRAINT "FK_d870176565d51364e84a24f8cbc"`
		);
		await queryRunner.query(
			`ALTER TABLE "person" DROP CONSTRAINT "FK_da028e48c59764ef85ca139857d"`
		);
		await queryRunner.query(`DROP INDEX "IDX_4b57e3d008abb21714be3c7b22"`);
		await queryRunner.query(`DROP TABLE "takedown_request"`);
		await queryRunner.query(`DROP TYPE "takedown_request_status_enum"`);
		await queryRunner.query(`DROP TYPE "takedown_request_type_enum"`);
		await queryRunner.query(`DROP TABLE "collection_entry"`);
		await queryRunner.query(`DROP INDEX "IDX_012eb80e4106a106419e453a6a"`);
		await queryRunner.query(`DROP INDEX "IDX_d5eca2db8a788b6481cf843c31"`);
		await queryRunner.query(`DROP INDEX "IDX_17c0f6ea1cd539cbd513a02926"`);
		await queryRunner.query(`DROP TABLE "audio_item"`);
		await queryRunner.query(`DROP TYPE "audio_item_status_enum"`);
		await queryRunner.query(`DROP TABLE "comment"`);
		await queryRunner.query(`DROP TABLE "tag"`);
		await queryRunner.query(`DROP TABLE "relationship"`);
		await queryRunner.query(`DROP TYPE "relationship_objectentitytype_enum"`);
		await queryRunner.query(`DROP TYPE "relationship_subjectentitytype_enum"`);
		await queryRunner.query(`DROP INDEX "IDX_a0031b16785b3b7dfed915e249"`);
		await queryRunner.query(`DROP INDEX "IDX_0c40b0dbe742aa63a6bb2b5231"`);
		await queryRunner.query(`DROP INDEX "IDX_03ee6f8829912ff0af96eb1de9"`);
		await queryRunner.query(`DROP TABLE "tune"`);
		await queryRunner.query(`DROP TYPE "tune_status_enum"`);
		await queryRunner.query(`DROP INDEX "IDX_555314762aec40216993528c63"`);
		await queryRunner.query(`DROP INDEX "IDX_1443badb6c7af8994264958b4d"`);
		await queryRunner.query(`DROP INDEX "IDX_493d5e591af774a1587d363fb8"`);
		await queryRunner.query(`DROP TABLE "place"`);
		await queryRunner.query(`DROP TYPE "place_status_enum"`);
		await queryRunner.query(`DROP INDEX "IDX_1c6d698eecbc29074530d1b15b"`);
		await queryRunner.query(`DROP INDEX "IDX_9281cb956dba2fe2b2006f1cbf"`);
		await queryRunner.query(`DROP INDEX "IDX_efda620b8e7e274a712072e2af"`);
		await queryRunner.query(`DROP TABLE "instrument"`);
		await queryRunner.query(`DROP TYPE "instrument_status_enum"`);
		await queryRunner.query(`DROP INDEX "IDX_62b704d492298158581b75b439"`);
		await queryRunner.query(`DROP INDEX "IDX_48e444390904f250a3b20e4d57"`);
		await queryRunner.query(`DROP INDEX "IDX_27c811883af9f3fefe79892f02"`);
		await queryRunner.query(`DROP TABLE "person"`);
		await queryRunner.query(`DROP TYPE "person_status_enum"`);
		await queryRunner.query(`DROP INDEX "IDX_78a916df40e02a9deb1c4b75ed"`);
		await queryRunner.query(`DROP TABLE "user"`);
		await queryRunner.query(`DROP TYPE "user_permissions_enum"`);
	}
}
