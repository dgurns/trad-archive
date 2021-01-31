import {
  Entity as TypeOrmEntity,
  BaseEntity as TypeOrmBaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  ObjectType,
  Field,
  createUnionType,
  registerEnumType,
} from 'type-graphql';

import { User } from 'entities/User';
import { Tag } from 'entities/Tag';

export enum ItemType {
  Audio = 'Audio',
}
registerEnumType(ItemType, {
  name: 'ItemType',
});

export const Item = createUnionType({
  name: 'Item',
  types: () => [AudioItem],
  resolveType: (value) => {
    switch (value.type) {
      case 'Audio':
        return AudioItem;
      default:
        return undefined;
    }
  },
});

// BaseItem represents the basic shared fields that all Items have. Each subclass
// that inherits this base BaseItem class (ie. AudioItem) is stored in its own DB
// table.
@ObjectType()
export class BaseItem extends TypeOrmBaseEntity {
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

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}

// AudioItem contains the BaseItem fields as well as fields specific to
// AudioItems.
@ObjectType()
@TypeOrmEntity()
export class AudioItem extends BaseItem {
  @Field(() => String)
  @Column({ nullable: true, default: 'Audio' })
  type!: 'Audio';

  @Field(() => [Tag], { defaultValue: [] })
  @OneToMany(() => Tag, (tag) => tag.audioItem)
  tags!: Tag[];

  @Field(() => String)
  @Column()
  urlSource!: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, default: null })
  urlMp3!: string;
}
