import {
	Entity as TypeOrmEntity,
	BaseEntity as TypeOrmBaseEntity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	Index,
	AfterLoad,
} from "typeorm";
import { ObjectType, Field, registerEnumType } from "type-graphql";
import { AudioItem } from "./entities/AudioItem";
import { User } from "./User";
import { Entity, EntityUnion } from "../resolvers/EntityResolver";

export enum TakedownRequestType {
	Copyright = "COPYRIGHT",
	Performer = "PERFORMER",
}
registerEnumType(TakedownRequestType, {
	name: "TakedownRequestType",
});

export enum TakedownRequestStatus {
	Pending = "PENDING",
	Approved = "APPROVED",
	Denied = "DENIED",
}
registerEnumType(TakedownRequestStatus, {
	name: "TakedownRequestStatus",
});

@ObjectType()
@TypeOrmEntity()
export class TakedownRequest extends TypeOrmBaseEntity {
	@Field(() => String)
	@PrimaryGeneratedColumn("uuid")
	readonly id!: string;

	@Field(() => AudioItem)
	@Index()
	@ManyToOne(() => AudioItem, { eager: true })
	audioItem!: AudioItem;

	@Field(() => TakedownRequestType)
	@Column({ type: "enum", enum: TakedownRequestType })
	type!: TakedownRequestType;

	@Field(() => String)
	@Column({ type: "text" })
	message!: string;

	@Field(() => TakedownRequestStatus, { nullable: true })
	@Column({
		type: "enum",
		enum: TakedownRequestStatus,
		nullable: true,
		default: TakedownRequestStatus.Pending,
	})
	status!: TakedownRequestStatus;

	@Field(() => User, { nullable: true })
	@ManyToOne(() => User, { eager: true })
	createdByUser!: User;
	@Column({ nullable: true, default: null })
	createdByUserId!: string;

	@Field()
	@CreateDateColumn({ type: "timestamp" })
	createdAt!: Date;

	@Field(() => User, { nullable: true })
	@ManyToOne(() => User, { eager: true })
	updatedByUser!: User;
	@Column({ nullable: true, default: null })
	updatedByUserId!: string;

	@Field()
	@UpdateDateColumn({ type: "timestamp" })
	updatedAt!: Date;

	// Generated fields make this model easier to consume via the GraphQL API.
	// These fields are not saved in the database and are generated at runtime.
	// The Entity is what the TakedownRequest refers to.
	@Field(() => EntityUnion, { nullable: true })
	entity!: Entity;
	@AfterLoad()
	setEntity() {
		this.entity = this.audioItem;
	}
}
