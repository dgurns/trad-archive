import { InputType, Field, registerEnumType } from 'type-graphql';

export enum CreateTagItemType {
  Audio = 'Audio',
}
export enum CreateTagEntityType {
  Place = 'Place',
  Person = 'Person',
  Instrument = 'Instrument',
  Tune = 'Tune',
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
