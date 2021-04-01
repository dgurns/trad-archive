export enum UserPermission {
	User = "USER",
	Admin = "ADMIN",
}

export interface User {
	id: string;
	permissions?: UserPermission[];
	email?: string;
	username: string;
	createdAt: string;
	updatedAt: string;
}

// Entity defines a union of all the different Entity types
export type Entity = AudioItem | Person | Instrument | Place;

export enum EntityType {
	AudioItem = "AudioItem",
	Person = "Person",
	Instrument = "Instrument",
	Place = "Place",
}

export function isAudioItem(entity: Entity): entity is AudioItem {
	return (entity as AudioItem).entityType === EntityType.AudioItem;
}
export function isPerson(entity: Entity): entity is Person {
	return (entity as Person).entityType === EntityType.Person;
}
export function isInstrument(entity: Entity): entity is Instrument {
	return (entity as Instrument).entityType === EntityType.Instrument;
}
export function isPlace(entity: Entity): entity is Place {
	return (entity as Place).entityType === EntityType.Place;
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
	comments?: Comment[] | null;
	commentsCount?: number;
	urlSource: string;
	isAddedToCollection?: boolean;
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

export interface Place extends BaseEntity {
	entityType: EntityType.Place;
	latitude: number;
	longitude: number;
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
	subjectEntity?: Entity;
	objectEntity: Entity;
	subjectTimeMarkerSeconds?: number | null;
	createdByUser: User;
	createdAt: string;
	updatedAt: string;
}

export interface Comment {
	id: string;
	parentAudioItem?: AudioItem | null;
	text: string;
	createdByUser: User;
	createdAt: string;
	updatedAt: string;
}

export interface CollectionEntry {
	id: string;
	audioItem?: AudioItem | null;
	user?: User | null;
	createdAt: string;
}
