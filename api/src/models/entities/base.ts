import {
	BaseEntity as TypeOrmBaseEntity,
	PrimaryGeneratedColumn,
	Index,
	Column,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";
import { ObjectType, Field, registerEnumType } from "type-graphql";
import { User } from "models/User";

// EntityType is an enum which defines the possible types for an Entity
export enum EntityType {
	AudioItem = "AudioItem",
	Person = "Person",
	Instrument = "Instrument",
	Place = "Place",
	Tune = "Tune",
}
registerEnumType(EntityType, {
	name: "EntityType",
});

// EntityStatus is an enum which defines the possible statuses for an Entity
export enum EntityStatus {
	Published = "PUBLISHED",
	TakenDown = "TAKEN_DOWN",
}
registerEnumType(EntityStatus, {
	name: "EntityStatus",
});

// EntityBaseFields represents the basic fields that are inherited by every
// Entity type like Person, AudioItem, Instrument, Place, or Tune
@ObjectType()
export class EntityBaseFields extends TypeOrmBaseEntity {
	@Field(() => String)
	@PrimaryGeneratedColumn("uuid")
	readonly id!: string;

	@Field(() => String)
	@Column()
	@Index()
	name!: string;

	@Field(() => String)
	@Column({ unique: true })
	@Index()
	slug!: string;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true, default: null })
	@Index()
	aliases!: string;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true, default: null })
	description!: string;

	@Field(() => EntityStatus)
	@Column({ type: "enum", enum: EntityStatus, default: EntityStatus.Published })
	status!: EntityStatus;

	@Field(() => User)
	@ManyToOne(() => User, { eager: true })
	createdByUser!: User;

	@Field(() => User)
	@ManyToOne(() => User, { eager: true })
	updatedByUser!: User;

	@Field()
	@CreateDateColumn({ type: "timestamptz" })
	createdAt!: Date;

	@Field()
	@UpdateDateColumn({ type: "timestamptz" })
	updatedAt!: Date;
}
