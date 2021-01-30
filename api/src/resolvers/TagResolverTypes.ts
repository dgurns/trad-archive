import { InputType, Field, registerEnumType } from 'type-graphql';

export enum CreateTagItemType {
  AudioItem = 'AudioItem',
}
export enum CreateTagEntityType {
  PlaceEntity = 'PlaceEntity',
  PersonEntity = 'PersonEntity',
  InstrumentEntity = 'InstrumentEntity',
  TuneEntity = 'TuneEntity',
}
registerEnumType(CreateTagItemType, {
  name: 'CreateTagItemType',
});
registerEnumType(CreateTagEntityType, {
  name: 'CreateTagEntityType',
});

@InputType()
export class CreateTagInput {
  @Field(() => CreateTagItemType)
  itemType!: CreateTagItemType;

  @Field()
  itemId!: string;

  @Field(() => CreateTagEntityType)
  entityType!: CreateTagEntityType;

  @Field()
  entityId!: string;
}
