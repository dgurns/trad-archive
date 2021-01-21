import {
  Entity as TypeOrmEntity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field, createUnionType } from 'type-graphql';

import { User } from 'entities/User';
import { Tag } from 'entities/Tag';

export const ItemUnion = createUnionType({
  name: 'Item',
  types: () => [AudioItem],
  resolveType: (value) => {
    if ('urlMp3' in value) {
      return AudioItem;
    }
    return undefined;
  },
});

// Item represents the basic shared fields that all Items have. Each subclass
// that inherits this base Item class (ie. AudioItem) is stored in its own DB
// table.
@ObjectType()
export class Item extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, default: null })
  title!: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, default: null })
  description!: string;

  @Field(() => User)
  @ManyToOne(() => User)
  addedByUser!: User;

  @Field(() => [Tag], { defaultValue: [] })
  @ManyToMany(() => Tag, { nullable: true })
  @JoinTable()
  tags!: Tag[];

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
@TypeOrmEntity()
export class AudioItem extends Item {
  @Field(() => String)
  @Column()
  urlSource!: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, default: null })
  urlMp3!: string;
}
