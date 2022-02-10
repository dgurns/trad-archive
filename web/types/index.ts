export enum PerPage {
	Ten = 10,
	Twenty = 20,
	Fifty = 50,
	Hundred = 100,
}

export enum SortBy {
	RecentlyTagged = "RecentlyTagged",
	RecentlyAdded = "RecentlyAdded",
	AToZ = "AToZ",
}

export enum ViewAs {
	Card = "Card",
	Compact = "Compact",
	List = "List",
}

export enum UserRole {
	User = "User",
	Admin = "Admin",
}

export enum CopyrightPermissionStatus {
	FullNonCommercialGranted = "FullNonCommercialGranted",
}
export interface User {
	id: string;
	role?: UserRole;
	email?: string;
	username: string;
	copyrightPermissionStatus?: CopyrightPermissionStatus | null;
	verifiedPerson?: Person | null;
	createdAt: string;
	updatedAt: string;
}

// Entity defines a union of all the different Entity types
export type Entity =
	| AudioItem
	| Person
	| Instrument
	| Place
	| Tune
	| Collection;

export enum EntityType {
	AudioItem = "AudioItem",
	Person = "Person",
	Instrument = "Instrument",
	Place = "Place",
	Tune = "Tune",
	Collection = "Collection",
}

export enum EntityStatus {
	Published = "Published",
	TakenDown = "TakenDown",
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
export function isTune(entity: Entity): entity is Tune {
	return (entity as Tune).entityType === EntityType.Tune;
}
export function isCollection(entity: Entity): entity is Collection {
	return (entity as Collection).entityType === EntityType.Collection;
}

interface BaseEntity {
	id: string;
	name: string;
	slug: string;
	aliases: string | null;
	description: string | null;
	tags: Tag[] | null;
	createdByUser: User | null;
	lastUpdatedByUser: User | null;
	status?: EntityStatus;
	createdAt: string;
	updatedAt: string;
}

export interface AudioItem extends BaseEntity {
	entityType: EntityType.AudioItem;
	comments?: Comment[] | null;
	commentsCount?: number;
	itmaAtomSlug: string | null;
	urlSource: string | null;
	isSavedByUser?: boolean;
}

export interface Person extends BaseEntity {
	entityType: EntityType.Person;
	firstName: string;
	middleName: string | null;
	lastName: string;
	verifiedUser?: User | null;
}

export interface Instrument extends BaseEntity {
	entityType: EntityType.Instrument;
}

export interface Place extends BaseEntity {
	entityType: EntityType.Place;
	latitude: number;
	longitude: number;
}

export interface Tune extends BaseEntity {
	entityType: EntityType.Tune;
	theSessionTuneId: string;
	type: string | null;
	meter: string | null;
	mode: string | null;
	abc: string | null;
}

export interface Collection extends BaseEntity {
	entityType: EntityType.Collection;
	itmaAtomSlug: string | null;
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
	createdByUser?: User | null;
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

export interface SavedItem {
	id: string;
	audioItem?: AudioItem | null;
	user?: User | null;
	createdAt: string;
}

export enum TakedownRequestType {
	Performer = "Performer",
	Copyright = "Copyright",
}

export enum TakedownRequestStatus {
	Pending = "Pending",
	Approved = "Approved",
	Denied = "Denied",
}

export interface TakedownRequest {
	id: string;
	entity?: Entity;
	type: TakedownRequestType;
	message: string | null;
	status: TakedownRequestStatus;
	createdByUser: User;
	createdAt: string;
	updatedByUser: User;
	updatedAt: string;
}

export const isPendingTakedownRequest = (takedownRequest: TakedownRequest) =>
	takedownRequest.status.valueOf() === "Pending";

export const isApprovedTakedownRequest = (takedownRequest: TakedownRequest) =>
	takedownRequest.status.valueOf() === "Approved";

export const isDeniedTakedownRequest = (takedownRequest: TakedownRequest) =>
	takedownRequest.status.valueOf() === "Denied";

export enum VerificationRequestStatus {
	Pending = "Pending",
	Approved = "Approved",
	Denied = "Denied",
}
export interface VerificationRequest {
	id: string;
	person: Person;
	presignedImageDownloadUrl: string | null;
	copyrightPermissionStatus: CopyrightPermissionStatus | null;
	status: VerificationRequestStatus;
	createdByUser: User;
	createdAt: string;
	updatedByUser: User;
	updatedAt: string;
}

export const isPendingVerificationRequest = (
	verificationRequest: VerificationRequest
) => verificationRequest.status.valueOf() === "Pending";

export const isApprovedVerificationRequest = (
	verificationRequest: VerificationRequest
) => verificationRequest.status.valueOf() === "Approved";

export const isDeniedVerificationRequest = (
	verificationRequest: VerificationRequest
) => verificationRequest.status.valueOf() === "Denied";
