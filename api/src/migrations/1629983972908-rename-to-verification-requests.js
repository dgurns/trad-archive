const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class renameToVerificationRequests1629983972908 {
	name = "renameToVerificationRequests1629983972908";

	async up(queryRunner) {
		await queryRunner.query(
			`CREATE TYPE "verification_request_status_enum" AS ENUM('Pending', 'Approved', 'Denied')`
		);
		await queryRunner.query(
			`CREATE TYPE "verification_request_copyrightpermissionstatus_enum" AS ENUM('FullNonCommercialGranted')`
		);
		await queryRunner.query(
			`CREATE TABLE "verification_request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "personId" uuid NOT NULL, "status" "verification_request_status_enum" DEFAULT 'Pending', "copyrightPermissionStatus" "verification_request_copyrightpermissionstatus_enum", "imageS3Key" character varying NOT NULL, "createdByUserId" uuid NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedByUserId" uuid, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_9d9499e0fabae343c7ec3ecfac9" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_763df5ddfc5de533461d83add6" ON "verification_request" ("personId") `
		);
		await queryRunner.query(
			`ALTER TABLE "verification_request" ADD CONSTRAINT "FK_763df5ddfc5de533461d83add6b" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "verification_request" ADD CONSTRAINT "FK_a8f2aa794f5a5df79e3f9cd415a" FOREIGN KEY ("createdByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "verification_request" ADD CONSTRAINT "FK_d8dc55c52d35f4c091110fde7ee" FOREIGN KEY ("updatedByUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	async down(queryRunner) {
		await queryRunner.query(
			`ALTER TABLE "verification_request" DROP CONSTRAINT "FK_d8dc55c52d35f4c091110fde7ee"`
		);
		await queryRunner.query(
			`ALTER TABLE "verification_request" DROP CONSTRAINT "FK_a8f2aa794f5a5df79e3f9cd415a"`
		);
		await queryRunner.query(
			`ALTER TABLE "verification_request" DROP CONSTRAINT "FK_763df5ddfc5de533461d83add6b"`
		);
		await queryRunner.query(`DROP INDEX "IDX_763df5ddfc5de533461d83add6"`);
		await queryRunner.query(`DROP TABLE "verification_request"`);
		await queryRunner.query(
			`DROP TYPE "verification_request_copyrightpermissionstatus_enum"`
		);
		await queryRunner.query(`DROP TYPE "verification_request_status_enum"`);
	}
};
