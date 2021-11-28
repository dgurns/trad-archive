import {
	Entity as TypeOrmEntity,
	Column,
	OneToMany,
	JoinColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { EntityBaseFields, EntityType } from "./base";
import { Tag } from "../Tag";

// Instrument represents a unique instrument like Fiddle or Button Accordion
@ObjectType()
@TypeOrmEntity()
export class Instrument extends EntityBaseFields {
	@Field(() => String)
	@Column({
		type: "simple-enum",
		enum: EntityType,
		nullable: true,
		default: EntityType.Instrument,
	})
	entityType!: EntityType.Instrument;

	// Resolver is defined with a FieldResolver in InstrumentResolver.ts
	@OneToMany(() => Tag, (tag) => tag.subjectInstrument)
	@JoinColumn()
	tags!: Tag[];
}
