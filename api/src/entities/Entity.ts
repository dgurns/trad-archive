import {
  Entity as TypeOrmEntity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, Float } from 'type-graphql';
import { User } from 'entities/User';

// Entity represents the basic fields that are inherited by every sub-Entity
// type like PersonEntity or PlaceEntity
@ObjectType()
export class Entity extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => String)
  @Column({ unique: true })
  slug!: string;

  // Due to `simple-array` column type, array items must not contain commas
  @Field(() => [String], { defaultValue: [] })
  @Column('simple-array', { nullable: true, default: [] })
  aliases!: string[];

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
// the basic Entity type
@ObjectType()
@TypeOrmEntity()
export class PlaceEntity extends Entity {
  @Field(() => Float)
  @Column({ nullable: true, default: null })
  latitude!: number;

  @Field(() => Float)
  @Column({ nullable: true, default: null })
  longitude!: number;
}

@ObjectType()
@TypeOrmEntity()
export class PersonEntity extends Entity {}

@ObjectType()
@TypeOrmEntity()
export class InstrumentEntity extends Entity {}

@ObjectType()
@TypeOrmEntity()
export class TuneEntity extends Entity {}

@ObjectType()
@TypeOrmEntity()
export class DateEntity extends Entity {}
