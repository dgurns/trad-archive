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
import { User } from "../User";

// EntityType is an enum which defines the possible types for an Entity
export enum EntityType {
	AudioItem = "AudioItem",
	Person = "Person",
	Instrument = "Instrument",
	Place = "Place",
	Tune = "Tune",
	Collection = "Collection",
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
	@Index(["idx_base_entity_name"], { fulltext: true, parser: "ngram" })
	name!: string;

	@Field(() => String)
	@Column({ unique: true })
	slug!: string;

	@Field(() => String, { nullable: true })
	@Column({ type: "text", nullable: true, default: null })
	@Index(["idx_base_entity_aliases"], { fulltext: true, parser: "ngram" })
	aliases!: string;

	@Field(() => String, { nullable: true })
	@Column({ type: "text", nullable: true, default: null })
	@Index(["idx_base_entity_description"], { fulltext: true, parser: "ngram" })
	description!: string;

	@Field(() => EntityStatus)
	@Column({ type: "enum", enum: EntityStatus, default: EntityStatus.Published })
	status!: EntityStatus;

	@Field(() => User, { nullable: true })
	@ManyToOne(() => User, { eager: true })
	createdByUser!: User;
	@Column({ nullable: true, default: null })
	createdByUserId!: string;

	@Field(() => User, { nullable: true })
	@ManyToOne(() => User, { eager: true })
	updatedByUser!: User;
	@Column({ nullable: true, default: null })
	updatedByUserId!: string;

	@Field()
	@CreateDateColumn({ type: "timestamp" })
	@Index()
	createdAt!: Date;

	@Field()
	@UpdateDateColumn({ type: "timestamp" })
	@Index()
	updatedAt!: Date;
}
