import { Entity as TypeOrmEntity, Column, OneToMany } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { EntityBaseFields, EntityType } from 'models/entities/base';
import { Tag } from 'models/Tag';
import { Comment } from 'models/Comment';

// AudioItem represents a unique audio source file in the archive
@ObjectType()
@TypeOrmEntity()
export class AudioItem extends EntityBaseFields {
  @Field(() => String)
  @Column({ nullable: true, default: EntityType.AudioItem })
  entityType!: EntityType.AudioItem;

  @Field(() => [Tag], { defaultValue: [] })
  @OneToMany(() => Tag, (tag) => tag.subjectAudioItem)
  tags!: Tag[];

  @Field(() => [Comment], { defaultValue: [] })
  @OneToMany(() => Comment, (comment) => comment.parentAudioItem)
  comments!: Comment[];

  @Field(() => String)
  @Column()
  urlSource!: string;
}
