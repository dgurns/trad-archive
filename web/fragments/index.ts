import { gql } from "@apollo/client";

export const UserFragments = {
	user: gql`
		fragment User on User {
			id
			username
			createdAt
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
			}
			objectEntity {
				...TagAudioItem
				...TagInstrument
				...TagPerson
				...TagPlace
			}
			subjectTimeMarkerSeconds
			createdAt
		}
		${RelationshipFragments.relationship}
		${TagEntityFragments.tagAudioItem}
		${TagEntityFragments.tagInstrument}
		${TagEntityFragments.tagPerson}
		${TagEntityFragments.tagPlace}
	`,
};

export const CommentFragments = {
	comment: gql`
		fragment Comment on Comment {
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
				...Tag
			}
			commentsCount
			isAddedToCollection
			createdByUser {
				id
				username
			}
			createdAt
			updatedAt
			urlSource
		}
		${TagFragments.tag}
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
