import {
  BaseEntity as TypeOrmBaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, registerEnumType } from 'type-graphql';
import { User } from 'entities/User';

// EntityType is an enum which defines the different types of entities
export enum EntityType {
  AudioItem = 'AudioItem',
  Person = 'Person',
  Instrument = 'Instrument',
  Place = 'Place',
}
registerEnumType(EntityType, {
  name: 'EntityType',
});

// EntityBaseFields represents the basic fields that are inherited by every
// Entity type like Person, AudioItem, or Instrument
@ObjectType()
export class EntityBaseFields extends TypeOrmBaseEntity {
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
  @ManyToOne(() => User, { eager: true })
  createdByUser!: User;

  @Field(() => User)
  @ManyToOne(() => User, { eager: true })
  updatedByUser!: User;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
