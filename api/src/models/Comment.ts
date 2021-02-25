import {
  Entity as TypeOrmEntity,
  BaseEntity as TypeOrmBaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { User } from 'models/User';
import { AudioItem } from 'models/entities/AudioItem';

@ObjectType()
@TypeOrmEntity()
export class Comment extends TypeOrmBaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Field(() => AudioItem, { nullable: true })
  @ManyToOne(() => AudioItem)
  parentAudioItem!: AudioItem;

  @Field(() => String)
  @Column()
  text!: string;

  @Field(() => User)
  @ManyToOne(() => User, { eager: true })
  createdByUser!: User;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
