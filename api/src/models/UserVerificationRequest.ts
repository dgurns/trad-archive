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
import { ObjectType, Field, registerEnumType } from "type-graphql";
import { User, CopyrightPermissionStatus } from "models/User";
import { Person } from "models/entities/Person";

export enum UserVerificationRequestStatus {
	Pending = "PENDING",
	Approved = "APPROVED",
	Denied = "DENIED",
}
registerEnumType(UserVerificationRequestStatus, {
	name: "UserVerificationRequestStatus",
});

@ObjectType()
@TypeOrmEntity()
export class UserVerificationRequest extends TypeOrmBaseEntity {
	@Field(() => String)
	@PrimaryGeneratedColumn("uuid")
	readonly id!: string;

	@Field(() => Person)
	@ManyToOne(() => Person, { eager: true })
	person!: Person;
	@Index()
	@Column()
	personId!: string;

	@Field(() => UserVerificationRequestStatus, { nullable: true })
	@Column({
		type: "enum",
		enum: UserVerificationRequestStatus,
		nullable: true,
		default: UserVerificationRequestStatus.Pending,
	})
	status!: UserVerificationRequestStatus;

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
