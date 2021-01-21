import {
  Entity as TypeOrmEntity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, registerEnumType } from 'type-graphql';

export enum UserPermission {
  User = 'USER',
  Admin = 'ADMIN',
}
registerEnumType(UserPermission, {
  name: 'UserPermission',
});

@ObjectType()
@TypeOrmEntity()
export class User extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Field(() => [UserPermission])
  @Column({
    type: 'enum',
    enum: UserPermission,
    array: true,
    default: [UserPermission.User],
  })
  permissions!: UserPermission[];

  @Field(() => String)
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
