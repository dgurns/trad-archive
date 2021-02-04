import { Entity as TypeOrmEntity, Column, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { EntityBaseFields, EntityType } from 'entities/entityHelpers';
import { Tag } from 'entities/Tag';

// Instrument represents a unique instrument like Fiddle or Button Accordion
@ObjectType()
@TypeOrmEntity()
export class Instrument extends EntityBaseFields {
  @Field(() => String)
  @Column({ nullable: true, default: EntityType.Instrument })
  entityType!: EntityType.Instrument;

  @Field(() => [Tag], { defaultValue: [] })
  @OneToMany(() => Tag, (tag) => tag.subjectInstrument)
  tags!: Tag[];
}
