import {
	Entity as TypeOrmEntity,
	BaseEntity as TypeOrmBaseEntity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
} from "typeorm";
import { ObjectType, Field, registerEnumType } from "type-graphql";
import { User } from "./User";

export enum SubmissionStatus {
	Pending = "Pending",
	Approved = "Approved",
	Denied = "Denied",
}
registerEnumType(SubmissionStatus, { name: "SubmissionStatus" });

export enum MaterialType {
	Audio = "Audio",
	Video = "Video",
	Image = "Image",
	Document = "Document",
}
registerEnumType(MaterialType, { name: "MaterialType" });

@ObjectType()
@TypeOrmEntity()
export class Submission extends TypeOrmBaseEntity {
	@Field(() => String)
	@PrimaryGeneratedColumn("uuid")
	readonly id!: string;

	@Field(() => SubmissionStatus, { nullable: true })
	@Column({
		type: "enum",
		enum: SubmissionStatus,
		nullable: true,
		default: SubmissionStatus.Pending,
	})
	status!: SubmissionStatus;

	@Field(() => [MaterialType])
	@Column({ type: "simple-array" })
	materialTypes!: MaterialType[];

	@Field(() => Boolean)
	@Column({ type: "bool" })
	userControlsCopyright!: boolean;

	@Field(() => String, { nullable: true })
	@Column({ type: "text", nullable: true, default: null })
	copyrightDetails!: string;

	@Field(() => String, { nullable: true })
	@Column({ type: "text", nullable: true, default: null })
	description!: string;

	@Field(() => String, { nullable: true })
	@Column({ type: "varchar", nullable: true, default: null })
	s3DirectoryKey!: string | null;

	@Field(() => User)
	@ManyToOne(() => User, { eager: true })
	createdByUser!: User;
	@Column()
	createdByUserId!: string;

	@Field()
	@CreateDateColumn({ type: "timestamp" })
	createdAt!: Date;

	@Field(() => User, { nullable: true })
	@ManyToOne(() => User, { eager: true })
	updatedByUser!: User;
	@Column({ nullable: true, default: null })
	updatedByUserId!: string;

	@Field()
	@UpdateDateColumn({ type: "timestamp" })
	updatedAt!: Date;
}
