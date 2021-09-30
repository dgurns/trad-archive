const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class collectionEntity1631784942798 {
    name = 'collectionEntity1631784942798'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "collection_status_enum" AS ENUM('PUBLISHED', 'TAKEN_DOWN')`);
        await queryRunner.query(`CREATE TABLE "collection" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "slug" character varying NOT NULL, "aliases" character varying, "description" character varying, "status" "collection_status_enum" NOT NULL DEFAULT 'PUBLISHED', "createdByUserId" uuid, "updatedByUserId" uuid, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "entityType" character varying DEFAULT 'Collection', "itmaAtomSlug" character varying, CONSTRAINT "UQ_75a6fd6eedd7fa7378de400b0aa" UNIQUE ("slug"), CONSTRAINT "PK_ad3f485bbc99d875491f44d7c85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_926e7bdc3f52cd582078a379f1" ON "collection" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_75a6fd6eedd7fa7378de400b0a" ON "collection" ("slug") `);
        await queryRunner.query(`CREATE INDEX "IDX_7aae0df65ce31efa9ae1890e4b" ON "collection" ("aliases") `);
        await queryRunner.query(`ALTER TABLE "public"."tag" ADD "subjectCollectionId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."tag" ADD "objectCollectionId" uuid`);
        await queryRunner.query(`ALTER TYPE "public"."relationship_subjectentitytype_enum" RENAME TO "relationship_subjectentitytype_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."relationship_subjectentitytype_enum" AS ENUM('AudioItem', 'Person', 'Instrument', 'Place', 'Tune', 'Collection')`);
        await queryRunner.query(`ALTER TABLE "public"."relationship" ALTER COLUMN "subjectEntityType" TYPE "public"."relationship_subjectentitytype_enum" USING "subjectEntityType"::"text"::"public"."relationship_subjectentitytype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."relationship_subjectentitytype_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."relationship_objectentitytype_enum" RENAME TO "relationship_objectentitytype_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."relationship_objectentitytype_enum" AS ENUM('AudioItem', 'Person', 'Instrument', 'Place', 'Tune', 'Collection')`);
        await queryRunner.query(`ALTER TABLE "public"."relationship" ALTER COLUMN "objectEntityType" TYPE "public"."relationship_objectentitytype_enum" USING "objectEntityType"::"text"::"public"."relationship_objectentitytype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."relationship_objectentitytype_enum_old"`);
        await queryRunner.query(`ALTER TABLE "collection" ADD CONSTRAINT "FK_7fb24b585d42dd61d49770d4378" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collection" ADD CONSTRAINT "FK_95684d2c628475cd7e23df7354d" FOREIGN KEY ("updatedByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."tag" ADD CONSTRAINT "FK_f2f51977d90406e83e2e205e676" FOREIGN KEY ("subjectCollectionId") REFERENCES "collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."tag" ADD CONSTRAINT "FK_238c3ba24a0041a6d0e2703fef2" FOREIGN KEY ("objectCollectionId") REFERENCES "collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."tag" DROP CONSTRAINT "FK_238c3ba24a0041a6d0e2703fef2"`);
        await queryRunner.query(`ALTER TABLE "public"."tag" DROP CONSTRAINT "FK_f2f51977d90406e83e2e205e676"`);
        await queryRunner.query(`ALTER TABLE "collection" DROP CONSTRAINT "FK_95684d2c628475cd7e23df7354d"`);
        await queryRunner.query(`ALTER TABLE "collection" DROP CONSTRAINT "FK_7fb24b585d42dd61d49770d4378"`);
        await queryRunner.query(`CREATE TYPE "public"."relationship_objectentitytype_enum_old" AS ENUM('AudioItem', 'Person', 'Instrument', 'Place', 'Tune')`);
        await queryRunner.query(`ALTER TABLE "public"."relationship" ALTER COLUMN "objectEntityType" TYPE "public"."relationship_objectentitytype_enum_old" USING "objectEntityType"::"text"::"public"."relationship_objectentitytype_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."relationship_objectentitytype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."relationship_objectentitytype_enum_old" RENAME TO "relationship_objectentitytype_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."relationship_subjectentitytype_enum_old" AS ENUM('AudioItem', 'Person', 'Instrument', 'Place', 'Tune')`);
        await queryRunner.query(`ALTER TABLE "public"."relationship" ALTER COLUMN "subjectEntityType" TYPE "public"."relationship_subjectentitytype_enum_old" USING "subjectEntityType"::"text"::"public"."relationship_subjectentitytype_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."relationship_subjectentitytype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."relationship_subjectentitytype_enum_old" RENAME TO "relationship_subjectentitytype_enum"`);
        await queryRunner.query(`ALTER TABLE "public"."tag" DROP COLUMN "objectCollectionId"`);
        await queryRunner.query(`ALTER TABLE "public"."tag" DROP COLUMN "subjectCollectionId"`);
        await queryRunner.query(`DROP INDEX "IDX_7aae0df65ce31efa9ae1890e4b"`);
        await queryRunner.query(`DROP INDEX "IDX_75a6fd6eedd7fa7378de400b0a"`);
        await queryRunner.query(`DROP INDEX "IDX_926e7bdc3f52cd582078a379f1"`);
        await queryRunner.query(`DROP TABLE "collection"`);
        await queryRunner.query(`DROP TYPE "collection_status_enum"`);
    }
}
