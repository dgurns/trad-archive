import { Entity as TypeOrmEntity, Column, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { BaseEntity, EntityType } from 'entities/entityHelpers';
import { Tag } from 'entities/Tag';

// AudioItem represents a unique audio source file in the archive
@ObjectType()
@TypeOrmEntity()
export class AudioItem extends BaseEntity {
  @Field(() => String)
  @Column({ nullable: true, default: EntityType.AudioItem })
  entityType!: EntityType.AudioItem;

  @Field(() => [Tag], { defaultValue: [] })
  @OneToMany(() => Tag, (tag) => tag.subjectAudioItem)
  tags!: Tag[];

  @Field(() => String)
  @Column()
  urlSource!: string;
}
