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

import { EntityType } from 'models/entities/base';
import { User } from 'models/User';

// Relationship represents a type of relationship between two entity types, for
// example when a person (subject) "plays" an instrument (object).
@ObjectType()
@TypeOrmEntity()
export class Relationship extends TypeOrmBaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => EntityType)
  @Column({ type: 'enum', enum: EntityType })
  subjectEntityType!: EntityType;

  @Field(() => EntityType)
  @Column({ type: 'enum', enum: EntityType })
  objectEntityType!: EntityType;

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
