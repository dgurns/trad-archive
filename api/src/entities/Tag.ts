import {
  Entity as TypeOrmEntity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { User } from 'entities/User';
import { AudioItem } from 'entities/Item';
import {
  PlaceEntity,
  PersonEntity,
  InstrumentEntity,
  TuneEntity,
  DateEntity,
} from 'entities/Entity';

@ObjectType()
@TypeOrmEntity()
export class Tag extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Field(() => AudioItem, { nullable: true })
  @ManyToOne(() => AudioItem, { nullable: true })
  audioItem!: AudioItem;

  @Field(() => PlaceEntity, { nullable: true })
  @ManyToOne(() => PlaceEntity, { nullable: true })
  placeEntity!: PlaceEntity;

  @Field(() => PersonEntity, { nullable: true })
  @ManyToOne(() => PersonEntity, { nullable: true })
  personEntity!: PersonEntity;

  @Field(() => InstrumentEntity, { nullable: true })
  @ManyToOne(() => InstrumentEntity, { nullable: true })
  instrumentEntity!: InstrumentEntity;

  @Field(() => TuneEntity, { nullable: true })
  @ManyToOne(() => TuneEntity, { nullable: true })
  tuneEntity!: TuneEntity;

  @Field(() => DateEntity, { nullable: true })
  @ManyToOne(() => DateEntity, { nullable: true })
  dateEntity!: DateEntity;

  @Field(() => User)
  @ManyToOne(() => User, { nullable: true })
  createdByUser!: User;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
