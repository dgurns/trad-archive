import {
	Entity as TypeOrmEntity,
	Column,
	OneToMany,
	JoinColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { EntityBaseFields, EntityType } from "models/entities/base";
import { Tag } from "models/Tag";

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
	@Column({ nullable: true, default: EntityType.Tune })
	entityType!: EntityType.Tune;

	@Field(() => [Tag], { defaultValue: [] })
	@OneToMany(() => Tag, (tag) => tag.subjectTune)
	@JoinColumn()
	tags!: Tag[];

	// theSessionId is the Tune ID on TheSession.org
	@Field(() => String)
	@Column()
	theSessionId!: string;
}
