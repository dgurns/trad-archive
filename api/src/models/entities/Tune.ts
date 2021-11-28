import {
	Entity as TypeOrmEntity,
	Column,
	OneToMany,
	JoinColumn,
	Index,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { EntityBaseFields, EntityType } from "./base";
import { Tag } from "../Tag";

// Tune represents a unique tune. Each Tune can have multiple settings. The data
// is drawn from TheSession.org database. Therefore new tunes must be added at
// https://thesession.org/tunes.
// Data sources:
// 	- https://github.com/adactio/TheSession-data/blob/main/json/tunes.json
// 	- https://github.com/adactio/TheSession-data/blob/main/json/aliases.json
@ObjectType()
@TypeOrmEntity()
export class Tune extends EntityBaseFields {
	@Field(() => String)
	@Column({
		type: "simple-enum",
		enum: EntityType,
		nullable: true,
		default: EntityType.Tune,
	})
	entityType!: EntityType.Tune;

	// Resolver is defined with a FieldResolver in TuneResolver.ts
	@OneToMany(() => Tag, (tag) => tag.subjectTune)
	@JoinColumn()
	tags!: Tag[];

	// theSessionTuneId is the Tune ID on TheSession.org
	@Field(() => String)
	@Column()
	theSessionTuneId!: string;

	// type, meter, mode, and abc are populated with data from TheSession
	@Field(() => String, { nullable: true })
	@Column({ nullable: true, default: null })
	type!: string;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true, default: null })
	meter!: string;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true, default: null })
	mode!: string;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true, default: null })
	abc!: string;
}
