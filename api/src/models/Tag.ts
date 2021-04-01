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

import { User } from "models/User";
import { AudioItem } from "models/entities/AudioItem";
import { Person } from "models/entities/Person";
import { Instrument } from "models/entities/Instrument";
import { Place } from "models/entities/Place";
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

	@ManyToOne(() => AudioItem, { nullable: true })
	subjectAudioItem!: AudioItem;

	@ManyToOne(() => Person, { nullable: true })
	subjectPerson!: Person;

	@ManyToOne(() => Instrument, { nullable: true })
	subjectInstrument!: Instrument;

	@ManyToOne(() => Place, { nullable: true })
	subjectPlace!: Place;

	@ManyToOne(() => AudioItem, { nullable: true })
	objectAudioItem!: AudioItem;

	@ManyToOne(() => Person, { nullable: true })
	objectPerson!: Person;

	@ManyToOne(() => Instrument, { nullable: true })
	objectInstrument!: Instrument;

	@ManyToOne(() => Place, { nullable: true })
	objectPlace!: Place;

	@Field(() => Int, { nullable: true })
	@Column({ nullable: true, default: null })
	subjectTimeMarkerSeconds!: number;

	@Field(() => User)
	@ManyToOne(() => User, { eager: true })
	createdByUser!: User;

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
			this.subjectPlace;
	}

	@Field(() => EntityUnion)
	objectEntity!: Entity;
	@AfterLoad()
	setObjectEntity() {
		this.objectEntity =
			this.objectAudioItem ??
			this.objectPerson ??
			this.objectInstrument ??
			this.objectPlace;
	}
}
