import {
  Entity as TypeOrmEntity,
  BaseEntity as TypeOrmBaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { User } from 'entities/User';
import { AudioItem } from 'entities/AudioItem';
import { Person } from 'entities/Person';
import { Instrument } from 'entities/Instrument';
import { Place } from 'entities/Place';
import { Relationship } from 'entities/Relationship';

// Tag represents a connection between two entities and specifies the
// relationship between them.
@ObjectType()
@TypeOrmEntity()
export class Tag extends TypeOrmBaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Field(() => Relationship)
  @ManyToOne(() => Relationship, { eager: true })
  relationship!: Relationship;

  @Field(() => AudioItem, { nullable: true })
  @ManyToOne(() => AudioItem, { nullable: true })
  subjectAudioItem!: AudioItem;

  @Field(() => Person, { nullable: true })
  @ManyToOne(() => Person, { nullable: true })
  subjectPerson!: Person;

  @Field(() => Instrument, { nullable: true })
  @ManyToOne(() => Instrument, { nullable: true })
  subjectInstrument!: Instrument;

  @Field(() => Place, { nullable: true })
  @ManyToOne(() => Place, { nullable: true })
  subjectPlace!: Place;

  @Field(() => AudioItem, { nullable: true })
  @ManyToOne(() => AudioItem, { nullable: true })
  objectAudioItem!: AudioItem;

  @Field(() => Person, { nullable: true })
  @ManyToOne(() => Person, { nullable: true })
  objectPerson!: Person;

  @Field(() => Instrument, { nullable: true })
  @ManyToOne(() => Instrument, { nullable: true })
  objectInstrument!: Instrument;

  @Field(() => Place, { nullable: true })
  @ManyToOne(() => Place, { nullable: true })
  objectPlace!: Place;

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
