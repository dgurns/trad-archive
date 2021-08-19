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
import { ObjectType, Field, FieldResolver, Int } from "type-graphql";

import { User } from "models/User";
import { AudioItem } from "models/entities/AudioItem";
import { Person } from "models/entities/Person";
import { Instrument } from "models/entities/Instrument";
import { Place } from "models/entities/Place";
import { Tune } from "models/entities/Tune";
import { Relationship } from "models/Relationship";
import { EntityUnion, Entity } from "resolvers/EntityResolver";

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
			this.subjectTune;
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
			this.objectTune;
	}
}
