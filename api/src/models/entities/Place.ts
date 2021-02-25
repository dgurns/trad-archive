import {
  Entity as TypeOrmEntity,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, Float } from 'type-graphql';

import { EntityBaseFields, EntityType } from 'models/entities/base';
import { Tag } from 'models/Tag';

// Place represents a unique location, for example "Cahersiveen". A town and its
// parent county would be two different Places.
@ObjectType()
@TypeOrmEntity()
export class Place extends EntityBaseFields {
  @Field(() => String)
  @Column({ nullable: true, default: EntityType.Place })
  entityType!: EntityType.Place;

  @Field(() => [Tag], { defaultValue: [] })
  @OneToMany(() => Tag, (tag) => tag.subjectPlace)
  @JoinColumn()
  tags!: Tag[];

  @Field(() => Float)
  @Column({ type: 'float' })
  latitude!: number;

  @Field(() => Float)
  @Column({ type: 'float' })
  longitude!: number;
}
