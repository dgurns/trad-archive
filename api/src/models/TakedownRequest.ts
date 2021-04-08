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
import { AudioItem } from "models/entities/AudioItem";
import { User } from "models/User";

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
	@ManyToOne(() => AudioItem)
	audioItem!: AudioItem;

	@Field(() => TakedownRequestType)
	@Column({ type: "enum", enum: TakedownRequestType })
	type!: TakedownRequestType;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true, default: null })
	message!: string;

	@Field(() => TakedownRequestStatus)
	@Column({ type: "enum", enum: TakedownRequestStatus })
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
}
