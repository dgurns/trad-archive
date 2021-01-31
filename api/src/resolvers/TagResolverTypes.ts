import { InputType, Field } from 'type-graphql';
import { ItemType } from 'entities/Item';
import { EntityType } from 'entities/Entity';

@InputType()
export class CreateTagInput {
  @Field(() => ItemType)
  itemType!: ItemType;

  @Field()
  itemId!: string;

  @Field(() => EntityType)
  entityType!: EntityType;

  @Field()
  entityId!: string;
}
