const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class updateEnum1629977472313 {
    name = 'updateEnum1629977472313'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TYPE "public"."user_verification_request_copyrightpermissionstatus_enum" RENAME TO "user_verification_request_copyrightpermissionstatus_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_verification_request_copyrightpermissionstatus_enum" AS ENUM('FullNonCommercialGranted')`);
        await queryRunner.query(`ALTER TABLE "public"."user_verification_request" ALTER COLUMN "copyrightPermissionStatus" TYPE "public"."user_verification_request_copyrightpermissionstatus_enum" USING "copyrightPermissionStatus"::"text"::"public"."user_verification_request_copyrightpermissionstatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_verification_request_copyrightpermissionstatus_enum_old"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."user_verification_request_copyrightpermissionstatus_enum_old" AS ENUM('FULL_NON_COMMERCIAL_GRANTED')`);
        await queryRunner.query(`ALTER TABLE "public"."user_verification_request" ALTER COLUMN "copyrightPermissionStatus" TYPE "public"."user_verification_request_copyrightpermissionstatus_enum_old" USING "copyrightPermissionStatus"::"text"::"public"."user_verification_request_copyrightpermissionstatus_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."user_verification_request_copyrightpermissionstatus_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_verification_request_copyrightpermissionstatus_enum_old" RENAME TO "user_verification_request_copyrightpermissionstatus_enum"`);
    }
}
