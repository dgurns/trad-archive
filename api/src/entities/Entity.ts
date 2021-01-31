import {
  Entity as TypeOrmEntity,
  BaseEntity as TypeOrmBaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, Float, createUnionType } from 'type-graphql';
import { User } from 'entities/User';

export const Entity = createUnionType({
  name: 'Entity',
  types: () => [PlaceEntity, PersonEntity, InstrumentEntity, TuneEntity],
  resolveType: (value) => {
    switch (value.type) {
      case 'Place':
        return PlaceEntity;
      case 'Person':
        return PersonEntity;
      case 'Instrument':
        return InstrumentEntity;
      case 'Tune':
        return TuneEntity;
      default:
        return undefined;
    }
  },
});

// BaseEntity represents the basic fields that are inherited by every Entity
// type like PersonEntity or PlaceEntity
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
  lastUpdatedByUser!: User;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}

// PlaceEntity contains properties specific to a Place that are not shared with
// the BaseEntity type
@ObjectType()
@TypeOrmEntity()
export class PlaceEntity extends BaseEntity {
  // type field is used for discriminating the type in the GraphQL union
  @Field(() => String)
  @Column({ nullable: true, default: 'Place' })
  type!: 'Place';

  @Field(() => Float)
  @Column({ nullable: true, default: null })
  latitude!: number;

  @Field(() => Float)
  @Column({ nullable: true, default: null })
  longitude!: number;
}

@ObjectType()
@TypeOrmEntity()
export class PersonEntity extends BaseEntity {
  @Field(() => String)
  @Column({ nullable: true, default: 'Person' })
  type!: 'Person';

  @Field(() => String)
  @Column()
  firstName!: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, default: null })
  middleName!: string;

  @Field(() => String)
  @Column()
  lastName!: string;
}

@ObjectType()
@TypeOrmEntity()
export class InstrumentEntity extends BaseEntity {
  @Field(() => String)
  @Column({ nullable: true, default: 'Instrument' })
  type!: 'Instrument';
}

@ObjectType()
@TypeOrmEntity()
export class TuneEntity extends BaseEntity {
  @Field(() => String)
  @Column({ nullable: true, default: 'Tune' })
  type!: 'Tune';

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, default: null })
  composer!: string;
}
