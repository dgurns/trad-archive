import {
	Entity as TypeOrmEntity,
	BaseEntity as TypeOrmBaseEntity,
	PrimaryGeneratedColumn,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
	Column,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";

import { User } from "./User";
import { AudioItem } from "./entities/AudioItem";

@ObjectType()
@TypeOrmEntity()
export class Comment extends TypeOrmBaseEntity {
	@Field(() => String)
	@PrimaryGeneratedColumn("uuid")
	readonly id!: string;

	@Field(() => AudioItem, { nullable: true })
	@ManyToOne(() => AudioItem, { eager: true })
	parentAudioItem!: AudioItem;
	@Column()
	parentAudioItemId!: string;

	@Field(() => String)
	@Column({ type: "text" })
	text!: string;

	@Field(() => User, { nullable: true })
	@ManyToOne(() => User, { eager: true })
	createdByUser!: User;
	@Column({ nullable: true, default: null })
	createdByUserId!: string;

	@Field()
	@CreateDateColumn({ type: "timestamp" })
	createdAt!: Date;

	@Field()
	@UpdateDateColumn({ type: "timestamp" })
	updatedAt!: Date;
}
