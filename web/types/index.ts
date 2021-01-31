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

export enum ItemType {
  Audio = 'Audio',
}

interface BaseItem {
  id: string;
  title: string | null;
  description: string | null;
  addedByUser: User;
  createdAt: string;
  updatedAt: string;
}

export interface AudioItem extends BaseItem {
  type: ItemType.Audio;
  tags: Tag[];
  urlSource: string;
  urlMp3: string | null;
}

// Item defines a union of all the possible Item types
export type Item = AudioItem;

export function isAudioItem(item: Item): item is AudioItem {
  return (item as AudioItem).type === 'Audio';
}

export interface Tag {
  id: string;
  audioItem: AudioItem | null;
  placeEntity: PlaceEntity | null;
  personEntity: PersonEntity | null;
  instrumentEntity: InstrumentEntity | null;
  tuneEntity: TuneEntity | null;
  createdByUser: User;
  createdAt: string;
  updatedAt: string;
}

export enum EntityType {
  Place = 'Place',
  Person = 'Person',
  Instrument = 'Instrument',
  Tune = 'Tune',
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
  type: EntityType.Place;
  latitude: number | null;
  longitude: number | null;
}

export interface PersonEntity extends BaseEntity {
  type: EntityType.Person;
  firstName: string;
  middleName: string | null;
  lastName: string;
}

export interface InstrumentEntity extends BaseEntity {
  type: EntityType.Instrument;
}

export interface TuneEntity extends BaseEntity {
  type: EntityType.Tune;
}

// Entity defines a union of all the different Entity types
export type Entity = PlaceEntity | PersonEntity | InstrumentEntity | TuneEntity;
