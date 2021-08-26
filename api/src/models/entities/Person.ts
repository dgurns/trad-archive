import {
	Entity as TypeOrmEntity,
	Column,
	OneToMany,
	OneToOne,
	JoinColumn,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { EntityBaseFields, EntityType } from "models/entities/base";
import { Tag } from "models/Tag";
import { User } from "models/User";

// Person represents a unique human, for example Seamus Ennis
@ObjectType()
@TypeOrmEntity()
export class Person extends EntityBaseFields {
	@Field(() => String)
	@Column({ nullable: true, default: EntityType.Person })
	entityType!: EntityType.Person;

	@Field(() => [Tag], { defaultValue: [] })
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

	@Field(() => User, { nullable: true })
	@OneToOne(() => User, { eager: true, nullable: true })
	verifiedUser!: User;
	@Column({ nullable: true })
	verifiedUserId!: string;
}
