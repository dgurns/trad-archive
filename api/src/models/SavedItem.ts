import {
	Entity as TypeOrmEntity,
	BaseEntity as TypeOrmBaseEntity,
	PrimaryGeneratedColumn,
	ManyToOne,
	CreateDateColumn,
	Column,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { User } from "./User";
import { AudioItem } from "./entities/AudioItem";

// SavedItem represents an AudioItem that has been saved to a user's
// personal collection
@ObjectType()
@TypeOrmEntity()
export class SavedItem extends TypeOrmBaseEntity {
	@Field(() => String)
	@PrimaryGeneratedColumn("uuid")
	readonly id!: string;

	@Field(() => AudioItem)
	@ManyToOne(() => AudioItem, { eager: true })
	audioItem!: AudioItem;
	@Column()
	audioItemId!: string;

	@Field(() => User)
	@ManyToOne(() => User, { eager: true })
	user!: User;
	@Column()
	userId!: string;

	@Field()
	@CreateDateColumn({ type: "timestamp" })
	createdAt!: Date;
}
