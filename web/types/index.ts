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

// Entity defines a union of all the different Entity types
export type Entity = AudioItem | Person | Instrument;

export enum EntityType {
  AudioItem = 'AudioItem',
  Person = 'Person',
  Instrument = 'Instrument',
}

export function isAudioItem(entity: Entity): entity is AudioItem {
  return (entity as AudioItem).entityType === EntityType.AudioItem;
}

interface BaseEntity {
  id: string;
  name: string;
  slug: string;
  aliases: string;
  description: string | null;
  tags: Tag[];
  createdByUser: User;
  lastUpdatedByUser: User;
  createdAt: string;
  updatedAt: string;
}

export interface AudioItem extends BaseEntity {
  entityType: EntityType.AudioItem;
  urlSource: string;
}

export interface Person extends BaseEntity {
  entityType: EntityType.Person;
  firstName: string;
  middleName: string | null;
  lastName: string;
}

export interface Instrument extends BaseEntity {
  entityType: EntityType.Instrument;
}

export interface Relationship {
  id: string;
  name: string;
  subjectEntityType: EntityType;
  objectEntityType: EntityType;
  createdByUser: User;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  relationship: Relationship;
  subjectAudioItem: AudioItem | null;
  subjectPerson: Person | null;
  subjectInstrument: Instrument | null;
  objectAudioItem: AudioItem | null;
  objectPerson: Person | null;
  objectInstrument: Instrument | null;
  createdByUser: User;
  createdAt: string;
  updatedAt: string;
}
