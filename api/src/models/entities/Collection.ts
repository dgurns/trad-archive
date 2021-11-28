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
	@Column({
		type: "simple-enum",
		enum: EntityType,
		nullable: true,
		default: EntityType.Collection,
	})
	entityType!: EntityType.Collection;

	@OneToMany(() => Tag, (tag) => tag.subjectCollection)
	@JoinColumn()
	tags!: Tag[];

	@Field(() => String, { nullable: true })
	@Column({ nullable: true, default: null })
	itmaAtomSlug!: String;
}
