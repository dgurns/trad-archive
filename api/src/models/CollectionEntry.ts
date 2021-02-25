import {
  Entity as TypeOrmEntity,
  BaseEntity as TypeOrmBaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { User } from 'models/User';
import { AudioItem } from 'models/entities/AudioItem';

// CollectionEntry represents an AudioItem that has been saved to a user's
// personal collection
@ObjectType()
@TypeOrmEntity()
export class CollectionEntry extends TypeOrmBaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Field(() => AudioItem)
  @ManyToOne(() => AudioItem)
  audioItem!: AudioItem;

  @Field(() => User)
  @ManyToOne(() => User)
  user!: User;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
