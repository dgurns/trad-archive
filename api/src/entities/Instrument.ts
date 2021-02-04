import { Entity as TypeOrmEntity, Column } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { BaseEntity, EntityType } from 'entities/entityHelpers';

// Instrument represents a unique instrument like Fiddle or Button Accordion
@ObjectType()
@TypeOrmEntity()
export class Instrument extends BaseEntity {
  @Field(() => String)
  @Column({ nullable: true, default: EntityType.Instrument })
  entityType!: EntityType.Instrument;
}
