import {
  Entity as TypeOrmEntity,
  BaseEntity as TypeOrmBaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Authorized, Field, registerEnumType } from 'type-graphql';

export enum UserPermission {
  User = 'USER',
  Admin = 'ADMIN',
}
registerEnumType(UserPermission, {
  name: 'UserPermission',
});

@ObjectType()
@TypeOrmEntity()
export class User extends TypeOrmBaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Authorized()
  @Field(() => [UserPermission], { nullable: true })
  @Column({
    type: 'enum',
    enum: UserPermission,
    array: true,
    default: [UserPermission.User],
  })
  permissions!: UserPermission[];

  @Authorized()
  @Field(() => String, { nullable: true })
  @Column({ unique: true })
  email!: string;

  @Field(() => String)
  @Column({ unique: true })
  username!: string;

  @Column()
  hashedPassword!: string;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
