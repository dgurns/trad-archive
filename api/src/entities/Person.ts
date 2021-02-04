import { Entity as TypeOrmEntity, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { BaseEntity, EntityType } from 'entities/entityHelpers';

// Person represents a unique human, for example Seamus Ennis
@ObjectType()
@TypeOrmEntity()
export class Person extends BaseEntity {
  @Field(() => String)
  @Column({ nullable: true, default: EntityType.Person })
  entityType!: EntityType.Person;

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
