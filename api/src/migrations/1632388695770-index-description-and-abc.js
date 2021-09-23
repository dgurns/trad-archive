const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class indexDescriptionAndAbc1632388695770 {
    name = 'indexDescriptionAndAbc1632388695770'

    async up(queryRunner) {
        await queryRunner.query(`CREATE INDEX "IDX_6f0d87837164f55e54bd35844a" ON "public"."audio_item" ("description") `);
        await queryRunner.query(`CREATE INDEX "IDX_d4c1852090697322de12e22c4b" ON "public"."person" ("description") `);
        await queryRunner.query(`CREATE INDEX "IDX_6b87e018a1b7cdc12a7adf38f7" ON "public"."instrument" ("description") `);
        await queryRunner.query(`CREATE INDEX "IDX_d9922c9e94efcfef7bee42313c" ON "public"."place" ("description") `);
        await queryRunner.query(`CREATE INDEX "IDX_6d97fb12657d78f5e69c7eeefb" ON "public"."tune" ("description") `);
        await queryRunner.query(`CREATE INDEX "IDX_f0cbba2a675f110a42bf778918" ON "public"."tune" ("abc") `);
        await queryRunner.query(`CREATE INDEX "IDX_f1704de398d1050249e4cae870" ON "public"."collection" ("description") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "public"."IDX_f1704de398d1050249e4cae870"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f0cbba2a675f110a42bf778918"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6d97fb12657d78f5e69c7eeefb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d9922c9e94efcfef7bee42313c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6b87e018a1b7cdc12a7adf38f7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d4c1852090697322de12e22c4b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6f0d87837164f55e54bd35844a"`);
    }
}
