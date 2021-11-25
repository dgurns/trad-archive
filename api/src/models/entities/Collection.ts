import {
	Entity as TypeOrmEntity,
	Column,
	OneToMany,
	JoinColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { EntityBaseFields, EntityType } from "./base";
import { Tag } from "../Tag";

// Collection represents a logical grouping of other Entities
@ObjectType()
@TypeOrmEntity()
export class Collection extends EntityBaseFields {
	@Field(() => String)
	@Column({ nullable: true, default: EntityType.Collection })
	entityType!: EntityType.Collection;

	@Field(() => [Tag], { defaultValue: [] })
	@OneToMany(() => Tag, (tag) => tag.subjectCollection)
	@JoinColumn()
	tags!: Tag[];

	@Field(() => String, { nullable: true })
	@Column({ nullable: true, default: null })
	itmaAtomSlug!: String;
}
