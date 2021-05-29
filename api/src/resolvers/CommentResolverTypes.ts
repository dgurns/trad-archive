import { InputType, Field, Int } from "type-graphql";
import { EntityType } from "models/entities/base";

@InputType()
export class CommentsInput {
	@Field(() => Int, { nullable: true, defaultValue: 10 })
	take?: number;

	@Field(() => Int, { nullable: true, defaultValue: 0 })
	skip?: number;
}

@InputType()
export class CommentsForParentEntityInput {
	@Field(() => EntityType)
	parentEntityType!: EntityType;

	@Field(() => String)
	parentEntityId!: string;
}

@InputType()
export class CreateCommentInput {
	@Field(() => String)
	parentAudioItemId!: string;

	@Field(() => String)
	text!: string;
}
