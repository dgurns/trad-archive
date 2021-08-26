import {
	Entity as TypeOrmEntity,
	BaseEntity as TypeOrmBaseEntity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Index,
	OneToOne,
} from "typeorm";
import { ObjectType, Authorized, Field, registerEnumType } from "type-graphql";
import { Person } from "./entities/Person";

export enum UserPermission {
	User = "USER",
	Admin = "ADMIN",
}
registerEnumType(UserPermission, {
	name: "UserPermission",
});

export enum CopyrightPermissionStatus {
	FullNonCommercialGranted = "FULL_NON_COMMERCIAL_GRANTED",
}
registerEnumType(CopyrightPermissionStatus, {
	name: "CopyrightPermissionStatus",
});

@ObjectType()
@TypeOrmEntity()
export class User extends TypeOrmBaseEntity {
	@Field(() => String)
	@PrimaryGeneratedColumn("uuid")
	readonly id!: string;

	@Authorized()
	@Field(() => [UserPermission], { nullable: true })
	@Column({
		type: "enum",
		enum: UserPermission,
		array: true,
		default: [UserPermission.User],
	})
	permissions!: UserPermission[];

	@Authorized()
	@Field(() => String, { nullable: true })
	@Column({ unique: true })
	email!: string;

	@Field(() => String)
	@Column({ unique: true })
	@Index()
	username!: string;

	@Column({ nullable: true, default: null })
	autoLoginTokenHashed!: string;

	@Column({ type: "timestamptz", nullable: true, default: null })
	autoLoginTokenExpiry!: Date;

	@Field(() => CopyrightPermissionStatus, { nullable: true })
	@Column({ nullable: true, default: null })
	copyrightPermissionStatus!: CopyrightPermissionStatus;

	@Field(() => Person, { nullable: true })
	@OneToOne(() => Person, { eager: true, nullable: true })
	@JoinColumn()
	verifiedPerson!: Person;
	@Column({ nullable: true })
	verifiedPersonId!: string;

	@Field()
	@CreateDateColumn({ type: "timestamptz" })
	createdAt!: Date;

	@Field()
	@UpdateDateColumn({ type: "timestamptz" })
	updatedAt!: Date;
}
