import {
  BaseEntity as TypeOrmBaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  ObjectType,
  Field,
  registerEnumType,
  createUnionType,
} from 'type-graphql';
import { User } from 'entities/User';
import { AudioItem } from 'entities/AudioItem';
import { Person } from 'entities/Person';
import { Instrument } from 'entities/Instrument';

export enum EntityType {
  AudioItem = 'AudioItem',
  Person = 'Person',
  Instrument = 'Instrument',
}
registerEnumType(EntityType, {
  name: 'EntityType',
});

// Entity is a GraphQL union type returned by resolvers. It contains logic for
// GraphQL clients to distinguish the entity type represented by a value.
export const Entity = createUnionType({
  name: 'Entity',
  types: () => [AudioItem, Person, Instrument],
  resolveType: (value) => {
    switch (value.entityType) {
      case EntityType.AudioItem:
        return AudioItem;
      case EntityType.Person:
        return Person;
      case EntityType.Instrument:
        return Instrument;
      default:
        return undefined;
    }
  },
});

// BaseEntity represents the basic fields that are inherited by every Entity
// type like Person, AudioItem, or Instrument
@ObjectType()
export class BaseEntity extends TypeOrmBaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => String)
  @Column({ unique: true })
  slug!: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, default: null })
  aliases!: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, default: null })
  description!: string;

  @Field(() => User)
  @ManyToOne(() => User)
  createdByUser!: User;

  @Field(() => User)
  @ManyToOne(() => User)
  updatedByUser!: User;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
