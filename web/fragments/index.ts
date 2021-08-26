import { gql } from "@apollo/client";

export const UserFragments = {
	user: gql`
		fragment User on User {
			id
			username
			copyrightPermissionStatus
			createdAt
		}
	`,
	currentUser: gql`
		fragment CurrentUser on User {
			id
			permissions
			email
			username
			copyrightPermissionStatus
		}
	`,
};

export const RelationshipFragments = {
	relationship: gql`
		fragment Relationship on Relationship {
			id
			name
			subjectEntityType
			objectEntityType
		}
	`,
};

export const TagEntityFragments = {
	tagAudioItem: gql`
		fragment TagAudioItem on AudioItem {
			id
			entityType
			name
			slug
		}
	`,
	tagInstrument: gql`
		fragment TagInstrument on Instrument {
			id
			entityType
			name
			slug
		}
	`,
	tagPerson: gql`
		fragment TagPerson on Person {
			id
			entityType
			name
			slug
		}
	`,
	tagPlace: gql`
		fragment TagPlace on Place {
			id
			entityType
			name
			slug
		}
	`,
	tagTune: gql`
		fragment TagTune on Tune {
			id
			entityType
			name
			slug
		}
	`,
};

export const TagFragments = {
	tag: gql`
		fragment Tag on Tag {
			id
			relationship {
				...Relationship
			}
			subjectEntity {
				...TagAudioItem
				...TagInstrument
				...TagPerson
				...TagPlace
				...TagTune
			}
			objectEntity {
				...TagAudioItem
				...TagInstrument
				...TagPerson
				...TagPlace
				...TagTune
			}
			subjectTimeMarkerSeconds
			createdByUser {
				...User
			}
			createdAt
		}
		${RelationshipFragments.relationship}
		${TagEntityFragments.tagAudioItem}
		${TagEntityFragments.tagInstrument}
		${TagEntityFragments.tagPerson}
		${TagEntityFragments.tagPlace}
		${TagEntityFragments.tagTune}
		${UserFragments.user}
	`,
	tagForEntity: gql`
		fragment TagForEntity on Tag {
			id
			relationship {
				...Relationship
			}
			objectEntity {
				...TagAudioItem
				...TagInstrument
				...TagPerson
				...TagPlace
				...TagTune
			}
			subjectTimeMarkerSeconds
			createdByUser {
				...User
			}
			createdAt
		}
		${RelationshipFragments.relationship}
		${TagEntityFragments.tagAudioItem}
		${TagEntityFragments.tagInstrument}
		${TagEntityFragments.tagPerson}
		${TagEntityFragments.tagPlace}
		${TagEntityFragments.tagTune}
		${UserFragments.user}
	`,
};

export const EntityFragments = {
	audioItem: gql`
		fragment AudioItem on AudioItem {
			id
			entityType
			name
			slug
			aliases
			description
			tags {
				...TagForEntity
			}
			commentsCount
			isAddedToCollection
			status
			createdByUser {
				id
				username
			}
			createdAt
			updatedAt
			urlSource
		}
		${TagFragments.tagForEntity}
	`,
	person: gql`
		fragment Person on Person {
			id
			entityType
			name
			slug
			aliases
			description
			tags {
				...Tag
			}
			createdByUser {
				id
				username
			}
			createdAt
			updatedAt
			firstName
			middleName
			lastName
		}
		${TagFragments.tag}
	`,
	instrument: gql`
		fragment Instrument on Instrument {
			id
			entityType
			name
			slug
			aliases
			description
			tags {
				...Tag
			}
			createdByUser {
				id
				username
			}
		}
		${TagFragments.tag}
	`,
	place: gql`
		fragment Place on Place {
			id
			entityType
			name
			slug
			aliases
			description
			tags {
				...Tag
			}
			latitude
			longitude
			createdByUser {
				id
				username
			}
		}
		${TagFragments.tag}
	`,
	tune: gql`
		fragment Tune on Tune {
			id
			entityType
			name
			slug
			aliases
			description
			tags {
				...Tag
			}
			theSessionTuneId
			type
			meter
			mode
			abc
		}
		${TagFragments.tag}
	`,
};

export const CommentFragments = {
	comment: gql`
		fragment Comment on Comment {
			id
			text
			parentAudioItem {
				...AudioItem
			}
			createdByUser {
				...User
			}
			createdAt
			updatedAt
		}
		${EntityFragments.audioItem}
		${UserFragments.user}
	`,
	commentWithoutParentEntity: gql`
		fragment CommentWithoutParentEntity on Comment {
			id
			text
			createdByUser {
				...User
			}
			createdAt
			updatedAt
		}
		${UserFragments.user}
	`,
};

export const CollectionEntryFragments = {
	collectionEntry: gql`
		fragment CollectionEntry on CollectionEntry {
			id
			audioItem {
				...AudioItem
			}
			createdAt
		}
		${EntityFragments.audioItem}
	`,
};

export const TakedownRequestFragments = {
	takedownRequest: gql`
		fragment TakedownRequest on TakedownRequest {
			id
			entity {
				...AudioItem
			}
			type
			message
			status
			createdByUser {
				id
				username
				email
			}
			createdAt
			updatedByUser {
				id
				username
				email
			}
			updatedAt
		}
		${EntityFragments.audioItem}
	`,
	takedownRequestWithoutEntity: gql`
		fragment TakedownRequestWithoutEntity on TakedownRequest {
			id
			type
			message
			status
			createdByUser {
				id
				username
				email
			}
			createdAt
			updatedByUser {
				id
				username
				email
			}
			updatedAt
		}
	`,
};

export const UserVerificationRequestFragments = {
	userVerificationRequest: gql`
		fragment UserVerificationRequest on UserVerificationRequest {
			id
			person {
				id
				entityType
				name
				slug
			}
			copyrightPermissionStatus
			status
			createdByUser {
				id
				username
				email
			}
			createdAt
			updatedByUser {
				id
				username
				email
			}
			updatedAt
		}
	`,
};
