import {
  Entity as TypeOrmEntity,
  BaseEntity as TypeOrmBaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { ObjectType, Field, registerEnumType } from 'type-graphql';

import { EntityType } from 'entities/entityHelpers';
import { User } from 'entities/User';

// RelationshipType defines the possible relationships between two entity types
export enum RelationshipType {
  AudioItemIsPerformedByPerson = 'is_performed_by',
  PersonIsPerformerOnAudioItem = 'is_performer_on',
  AudioItemContainsInstrument = 'contains',
  InstrumentIsPlayedOnAudioItem = 'is_played_on',
  PersonPlaysInstrument = 'plays',
  InstrumentIsPlayedByPerson = 'is_played_by',
}
registerEnumType(RelationshipType, {
  name: 'RelationshipType',
});

// Relationship represents a type of relationship between two entity types, for
// example when a person (subject) "plays" an instrument (object).
@ObjectType()
@TypeOrmEntity()
export class Relationship extends TypeOrmBaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Field(() => RelationshipType)
  @Column({ type: 'enum', enum: RelationshipType })
  type!: RelationshipType;

  @Field(() => EntityType)
  @Column({ type: 'enum', enum: EntityType })
  subjectEntityType!: EntityType;

  @Field(() => EntityType)
  @Column({ type: 'enum', enum: EntityType })
  objectEntityType!: EntityType;

  @Field(() => User)
  @ManyToOne(() => User)
  createdByUser!: User;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
