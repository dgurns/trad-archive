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
import { AudioItem } from "models/entities/AudioItem";
import { User } from "models/User";
import { Entity, EntityUnion } from "resolvers/EntityResolver";

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
	@Column()
	message!: string;

	@Field(() => TakedownRequestStatus, { nullable: true })
	@Column({
		type: "enum",
		enum: TakedownRequestStatus,
		nullable: true,
		default: TakedownRequestStatus.Pending,
	})
	status!: TakedownRequestStatus;

	@Field(() => User)
	@ManyToOne(() => User, { eager: true })
	createdByUser!: User;

	@Field()
	@CreateDateColumn({ type: "timestamptz" })
	createdAt!: Date;

	@Field(() => User)
	@ManyToOne(() => User, { eager: true })
	updatedByUser!: User;

	@Field()
	@UpdateDateColumn({ type: "timestamptz" })
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
