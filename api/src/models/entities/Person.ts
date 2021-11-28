import {
	Entity as TypeOrmEntity,
	Column,
	OneToMany,
	JoinColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { EntityBaseFields, EntityType } from "./base";
import { Tag } from "../Tag";

// Person represents a unique human, for example Seamus Ennis
@ObjectType()
@TypeOrmEntity()
export class Person extends EntityBaseFields {
	@Field(() => String)
	@Column({
		type: "simple-enum",
		enum: EntityType,
		nullable: true,
		default: EntityType.Person,
	})
	entityType!: EntityType.Person;

	// Resolver is defined with a FieldResolver in PersonResolver.ts
	@OneToMany(() => Tag, (tag) => tag.subjectPerson)
	@JoinColumn()
	tags!: Tag[];

	@Field(() => String)
	@Column()
	firstName!: string;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true, default: null })
	middleName!: string;

	@Field(() => String)
	@Column()
	lastName!: string;
}
