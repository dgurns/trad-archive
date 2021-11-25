import {
	Entity as TypeOrmEntity,
	BaseEntity as TypeOrmBaseEntity,
	PrimaryGeneratedColumn,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
	AfterLoad,
	Column,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

import { User } from "./User";
import { AudioItem } from "./entities/AudioItem";
import { Person } from "./entities/Person";
import { Instrument } from "./entities/Instrument";
import { Place } from "./entities/Place";
import { Tune } from "./entities/Tune";
import { Collection } from "./entities/Collection";
import { Relationship } from "./Relationship";
import { EntityUnion, Entity } from "../resolvers/EntityResolver";

// Tag represents a connection between two entities and specifies the
// relationship between them.
@ObjectType()
@TypeOrmEntity()
export class Tag extends TypeOrmBaseEntity {
	@Field(() => String)
	@PrimaryGeneratedColumn("uuid")
	readonly id!: string;

	@Field(() => Relationship)
	@ManyToOne(() => Relationship, { eager: true })
	relationship!: Relationship;
	@Column()
	relationshipId!: string;

	@ManyToOne(() => AudioItem, { nullable: true, eager: true })
	subjectAudioItem!: AudioItem;
	@Column({ nullable: true, default: null })
	subjectAudioItemId!: string;

	@ManyToOne(() => Person, { nullable: true, eager: true })
	subjectPerson!: Person;
	@Column({ nullable: true, default: null })
	subjectPersonId!: string;

	@ManyToOne(() => Instrument, { nullable: true, eager: true })
	subjectInstrument!: Instrument;
	@Column({ nullable: true, default: null })
	subjectInstrumentId!: string;

	@ManyToOne(() => Place, { nullable: true, eager: true })
	subjectPlace!: Place;
	@Column({ nullable: true, default: null })
	subjectPlaceId!: string;

	@ManyToOne(() => Tune, { nullable: true, eager: true })
	subjectTune!: Tune;
	@Column({ nullable: true, default: null })
	subjectTuneId!: string;

	@ManyToOne(() => Collection, { nullable: true, eager: true })
	subjectCollection!: Collection;
	@Column({ nullable: true, default: null })
	subjectCollectionId!: string;

	@ManyToOne(() => AudioItem, { nullable: true, eager: true })
	objectAudioItem!: AudioItem;
	@Column({ nullable: true, default: null })
	objectAudioItemId!: string;

	@ManyToOne(() => Person, { nullable: true, eager: true })
	objectPerson!: Person;
	@Column({ nullable: true, default: null })
	objectPersonId!: string;

	@ManyToOne(() => Instrument, { nullable: true, eager: true })
	objectInstrument!: Instrument;
	@Column({ nullable: true, default: null })
	objectInstrumentId!: string;

	@ManyToOne(() => Place, { nullable: true, eager: true })
	objectPlace!: Place;
	@Column({ nullable: true, default: null })
	objectPlaceId!: string;

	@ManyToOne(() => Tune, { nullable: true, eager: true })
	objectTune!: Tune;
	@Column({ nullable: true, default: null })
	objectTuneId!: string;

	@ManyToOne(() => Collection, { nullable: true, eager: true })
	objectCollection!: Collection;
	@Column({ nullable: true, default: null })
	objectCollectionId!: string;

	@Field(() => Int, { nullable: true })
	@Column({ nullable: true, default: null })
	subjectTimeMarkerSeconds!: number;

	@Field(() => User, { nullable: true })
	@ManyToOne(() => User, { eager: true })
	createdByUser!: User;
	@Column({ nullable: true, default: null })
	createdByUserId!: string;

	@Field()
	@CreateDateColumn({ type: "timestamptz" })
	createdAt!: Date;

	@Field()
	@UpdateDateColumn({ type: "timestamptz" })
	updatedAt!: Date;

	// Generated fields make this model easier to consume via the GraphQL API.
	// These fields are not saved in the database and are generated at runtime.
	// `subjectEntity` is nullable because if you're getting tags for an entity,
	// you wouldn't need to return the subject entity itself.
	@Field(() => EntityUnion, { nullable: true })
	subjectEntity!: Entity;
	@AfterLoad()
	setSubjectEntity() {
		this.subjectEntity =
			this.subjectAudioItem ??
			this.subjectPerson ??
			this.subjectInstrument ??
			this.subjectPlace ??
			this.subjectTune ??
			this.subjectCollection;
	}

	@Field(() => EntityUnion)
	objectEntity!: Entity;
	@AfterLoad()
	setObjectEntity() {
		this.objectEntity =
			this.objectAudioItem ??
			this.objectPerson ??
			this.objectInstrument ??
			this.objectPlace ??
			this.objectTune ??
			this.objectCollection;
	}
}
