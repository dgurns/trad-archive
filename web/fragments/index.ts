import { gql } from "@apollo/client";

export const UserFragments = {
	user: gql`
		fragment User on User {
			id
			username
			copyrightPermissionStatus
			verifiedPerson {
				id
				entityType
				slug
				name
			}
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
	tagCollection: gql`
		fragment TagCollection on Collection {
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
				...TagCollection
			}
			objectEntity {
				...TagAudioItem
				...TagInstrument
				...TagPerson
				...TagPlace
				...TagTune
				...TagCollection
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
		${TagEntityFragments.tagCollection}
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
				...TagCollection
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
		${TagEntityFragments.tagCollection}
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
			isSavedByUser
			status
			createdByUser {
				id
				username
				verifiedPerson {
					id
					entityType
					slug
				}
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
			verifiedUser {
				...User
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
		${UserFragments.user}
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
	collection: gql`
		fragment Collection on Collection {
			id
			entityType
			name
			slug
			aliases
			description
			tags {
				...Tag
			}
			itmaAtomSlug
			createdByUser {
				id
				username
			}
			createdAt
			updatedAt
		}
		${TagFragments.tag}
		${UserFragments.user}
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

export const SavedItemFragments = {
	savedItem: gql`
		fragment SavedItem on SavedItem {
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

export const VerificationRequestFragments = {
	verificationRequest: gql`
		fragment VerificationRequest on VerificationRequest {
			id
			person {
				id
				entityType
				name
				slug
			}
			presignedImageDownloadUrl
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
