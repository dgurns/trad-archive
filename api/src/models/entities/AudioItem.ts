import { Entity as TypeOrmEntity, Column, OneToMany, AfterLoad } from "typeorm";
import { ObjectType, Field } from "type-graphql";

import {
	EntityBaseFields,
	EntityType,
	EntityStatus,
} from "models/entities/base";
import { Tag } from "models/Tag";
import { Comment } from "models/Comment";

// AudioItem represents a unique audio source file in the archive
@ObjectType()
@TypeOrmEntity()
export class AudioItem extends EntityBaseFields {
	@Field(() => String)
	@Column({ nullable: true, default: EntityType.AudioItem })
	entityType!: EntityType.AudioItem;

	@Field(() => [Tag], { defaultValue: [] })
	@OneToMany(() => Tag, (tag) => tag.subjectAudioItem)
	tags!: Tag[];

	@Field(() => [Comment], { defaultValue: [] })
	@OneToMany(() => Comment, (comment) => comment.parentAudioItem)
	comments!: Comment[];

	@Field(() => String, { nullable: true })
	@Column({ type: "varchar", nullable: true, default: null })
	urlSource!: string | null;
	@AfterLoad()
	returnNullIfTakenDown() {
		// Return null if the AudioItem has been taken down, to prevent consumers of
		// the API from accessing the source audio URL
		if (this.status === EntityStatus.TakenDown) {
			this.urlSource = null;
		}
	}
}
