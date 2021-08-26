import {
	Entity as TypeOrmEntity,
	BaseEntity as TypeOrmBaseEntity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	Index,
} from "typeorm";
import {
	ObjectType,
	Field,
	registerEnumType,
	FieldResolver,
} from "type-graphql";
import { User, CopyrightPermissionStatus } from "models/User";
import { Person } from "models/entities/Person";

export enum VerificationRequestStatus {
	Pending = "Pending",
	Approved = "Approved",
	Denied = "Denied",
}
registerEnumType(VerificationRequestStatus, {
	name: "VerificationRequestStatus",
});

@ObjectType()
@TypeOrmEntity()
export class VerificationRequest extends TypeOrmBaseEntity {
	@Field(() => String)
	@PrimaryGeneratedColumn("uuid")
	readonly id!: string;

	@Field(() => Person)
	@ManyToOne(() => Person, { eager: true })
	person!: Person;
	@Index()
	@Column()
	personId!: string;

	@Field(() => VerificationRequestStatus, { nullable: true })
	@Column({
		type: "enum",
		enum: VerificationRequestStatus,
		nullable: true,
		default: VerificationRequestStatus.Pending,
	})
	status!: VerificationRequestStatus;

	@Field(() => CopyrightPermissionStatus, { nullable: true })
	@Column({
		type: "enum",
		enum: CopyrightPermissionStatus,
		nullable: true,
		default: null,
	})
	copyrightPermissionStatus!: CopyrightPermissionStatus;

	@Column()
	imageS3Key!: string;

	@Field(() => User)
	@ManyToOne(() => User, { eager: true })
	createdByUser!: User;
	@Column()
	createdByUserId!: string;

	@Field()
	@CreateDateColumn({ type: "timestamptz" })
	createdAt!: Date;

	@Field(() => User, { nullable: true })
	@ManyToOne(() => User, { eager: true })
	updatedByUser!: User;
	@Column({ nullable: true, default: null })
	updatedByUserId!: string;

	@Field()
	@UpdateDateColumn({ type: "timestamptz" })
	updatedAt!: Date;
}
