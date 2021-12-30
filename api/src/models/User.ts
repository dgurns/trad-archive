import {
	Entity as TypeOrmEntity,
	BaseEntity as TypeOrmBaseEntity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";
import { ObjectType, Authorized, Field, registerEnumType } from "type-graphql";

export enum UserRole {
	User = "User",
	Admin = "Admin",
}
registerEnumType(UserRole, {
	name: "UserRole",
});

export enum CopyrightPermissionStatus {
	FullNonCommercialGranted = "FullNonCommercialGranted",
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
	@Field(() => UserRole, { nullable: true })
	@Column({
		type: "enum",
		enum: UserRole,
		default: UserRole.User,
	})
	role!: UserRole;

	@Field(() => String)
	@Column()
	dummyField!: string;

	@Authorized()
	@Field(() => String, { nullable: true })
	@Column({ unique: true })
	email!: string;

	@Field(() => String)
	@Column({ unique: true })
	username!: string;

	@Column({ nullable: true, default: null })
	autoLoginTokenHashed!: string;

	@Column({ type: "timestamp", nullable: true, default: null })
	autoLoginTokenExpiry!: Date;

	@Field(() => CopyrightPermissionStatus, { nullable: true })
	@Column({
		type: "enum",
		enum: CopyrightPermissionStatus,
		nullable: true,
		default: null,
	})
	copyrightPermissionStatus!: CopyrightPermissionStatus;

	@Field()
	@CreateDateColumn()
	createdAt!: Date;

	@Field()
	@UpdateDateColumn()
	updatedAt!: Date;
}
