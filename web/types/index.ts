export enum UserPermission {
  User = 'USER',
  Admin = 'ADMIN',
}

export interface User {
  id: string;
  permissions: UserPermission[];
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

interface BaseItem {
  id: string;
  title: string | null;
  description: string | null;
  addedByUser: User;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
}

export interface AudioItem extends BaseItem {
  urlSource: string;
  urlMp3: string | null;
}

// Item defines a union of all the possible Item types
export type Item = AudioItem;

export function isAudioItem(item: Item): item is AudioItem {
  return (item as AudioItem).urlMp3 !== undefined;
}

export interface Tag {
  id: string;
  audioItem: AudioItem | null;
  placeEntity: PlaceEntity | null;
  personEntity: PersonEntity | null;
  instrumentEntity: InstrumentEntity | null;
  tuneEntity: TuneEntity | null;
  dateEntity: DateEntity | null;
  createdByUser: User;
  createdAt: string;
  updatedAt: string;
}

interface BaseEntity {
  id: string;
  name: string;
  slug: string;
  aliases: string;
  description: string | null;
  createdByUser: User;
  lastUpdatedByUser: User;
  createdAt: string;
  updatedAt: string;
}

export interface PlaceEntity extends BaseEntity {
  latitude: number | null;
  longitude: number | null;
}

export interface PersonEntity extends BaseEntity {
  firstName: string;
  middleName: string | null;
  lastName: string;
}

export interface InstrumentEntity extends BaseEntity {}

export interface TuneEntity extends BaseEntity {}

export interface DateEntity extends BaseEntity {}

// Entity defines a union of all the different Entity types
export type Entity =
  | PlaceEntity
  | PersonEntity
  | InstrumentEntity
  | TuneEntity
  | DateEntity;
