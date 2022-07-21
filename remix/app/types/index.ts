import type {
	User,
	AudioItem,
	Collection,
	Instrument,
	Person,
	Place,
	Tune,
} from "@prisma/client";
import { Prisma } from "@prisma/client";

export type Entity =
	| AudioItem
	| AudioItemWithRelations
	| Collection
	| CollectionWithRelations
	| Instrument
	| Person
	| Place
	| Tune;

const audioItemWithRelations = Prisma.validator<Prisma.AudioItemArgs>()({
	include: {
		tagsAsSubject: {
			include: {
				objectAudioItem: true,
				objectCollection: true,
				objectInstrument: true,
				objectPerson: true,
				objectPlace: true,
				objectTune: true,
				relationship: true,
			},
		},
		createdByUser: true,
		updatedByUser: true,
		comments: {
			include: {
				createdByUser: true,
			},
		},
	},
});
export type AudioItemWithRelations = Prisma.AudioItemGetPayload<
	typeof audioItemWithRelations
>;

const collectionWithRelations = Prisma.validator<Prisma.CollectionArgs>()({
	include: { tagsAsSubject: true, createdByUser: true, updatedByUser: true },
});
export type CollectionWithRelations = Prisma.CollectionGetPayload<
	typeof collectionWithRelations
>;

const commentWithRelations = Prisma.validator<Prisma.CommentArgs>()({
	include: { parentAudioItem: true, createdByUser: true },
});
export type CommentWithRelations = Prisma.CommentGetPayload<
	typeof commentWithRelations
>;

const savedItemWithRelations = Prisma.validator<Prisma.SavedItemArgs>()({
	include: {
		audioItem: {
			include: {
				tagsAsSubject: {
					include: {
						objectAudioItem: true,
						objectCollection: true,
						objectInstrument: true,
						objectPerson: true,
						objectPlace: true,
						objectTune: true,
						relationship: true,
					},
				},
				createdByUser: true,
				updatedByUser: true,
				comments: {
					include: {
						createdByUser: true,
					},
				},
			},
		},
	},
});
export type SavedItemWithRelations = Prisma.SavedItemGetPayload<
	typeof savedItemWithRelations
>;

const tagWithRelations = Prisma.validator<Prisma.TagArgs>()({
	include: {
		objectAudioItem: true,
		objectCollection: true,
		objectInstrument: true,
		objectPerson: true,
		objectPlace: true,
		objectTune: true,
		relationship: true,
	},
});
export type TagWithRelations = Prisma.TagGetPayload<typeof tagWithRelations>;

// EVERYTHING BELOW THIS LINE SHOULD BE GRADUALLY DEPRECATED

export enum EntityType {
	AudioItem = "AudioItem",
	Person = "Person",
	Instrument = "Instrument",
	Place = "Place",
	Tune = "Tune",
	Collection = "Collection",
}

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
	Cards = "Cards",
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

export enum EntityStatus {
	Published = "PUBLISHED",
	TakenDown = "TAKEN_DOWN",
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
export interface Relationship {
	id: string;
	name: string;
	subjectEntityType: EntityType;
	objectEntityType: EntityType;
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

export enum SubmissionStatus {
	Pending = "Pending",
	Approved = "Approved",
	Denied = "Denied",
}
export enum SubmissionMaterialType {
	Audio = "Audio",
	Video = "Video",
	Image = "Image",
	Document = "Document",
}
export interface Submission {
	id: string;
	status: SubmissionStatus;
	materialTypes: SubmissionMaterialType[];
	userControlsCopyright: boolean;
	copyrightDetails: string | null;
	description: string | null;
	s3DirectoryKey: string | null;
	createdByUser: User;
	createdAt: string;
	updatedByUser: User;
	updatedAt: string;
}

export interface Stats {
	numAudioItemsAllTime: number;
	numTagsAllTime: number;
	numCommentsAllTime: number;
}
