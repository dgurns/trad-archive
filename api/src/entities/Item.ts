import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

import { RelationColumn } from 'entities/entityHelpers';
import { User } from 'entities/User';

// Item represents the basic shared fields that all Items have. Each subclass
// that inherits this base Item class (ie. AudioItem) is stored in its own DB
// table.
@ObjectType()
export class Item extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, default: null })
  title!: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, default: null })
  description!: string;

  @Field(() => User)
  @ManyToOne(() => User)
  addedByUser!: User;
  @RelationColumn()
  addedByUserId!: number;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}

// AudioItem contains the base Item fields as well as fields specific to
// AudioItems.
@ObjectType()
@Entity()
export class AudioItem extends Item {
  @Field(() => String)
  @Column()
  urlSource!: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, default: null })
  urlMp3!: string;
}
