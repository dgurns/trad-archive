import type {
	User,
	AudioItem,
	Relationship,
	Collection,
	Person,
	Tag,
	Comment,
} from "@prisma/client";
import { PrismaClient, EntityType } from "@prisma/client";
const prisma = new PrismaClient();

const user1: Pick<User, "id" | "email" | "username" | "role"> = {
	id: "user_1",
	email: "dan@dangurney.net",
	username: "dgurney",
	role: "Admin",
};
const audioItem1: Pick<
	AudioItem,
	"id" | "slug" | "name" | "description" | "createdByUserId"
> = {
	id: "audioItem_1",
	slug: "rare-recording-of-michael-coleman",
	name: "Rare recording of Michael Coleman",
	description: "This was unearthed in an old audio tape in the attic.",
	createdByUserId: user1.id,
};
const collection1: Pick<
	Collection,
	"id" | "slug" | "name" | "description" | "createdByUserId"
> = {
	id: "collection_1",
	slug: "the-complete-collection",
	name: "The Complete Collection",
	description: "A sample collection to use.",
	createdByUserId: user1.id,
};
const person1: Pick<
	Person,
	| "id"
	| "slug"
	| "name"
	| "description"
	| "firstName"
	| "lastName"
	| "createdByUserId"
> = {
	id: "person_1",
	slug: "seamus-ennis",
	name: "Seamus Ennis",
	description: "Uilleann piper and collector",
	firstName: "Seamus",
	lastName: "Ennis",
	createdByUserId: user1.id,
};
const relationship1: Pick<
	Relationship,
	"id" | "name" | "subjectEntityType" | "objectEntityType" | "createdByUserId"
> = {
	id: "relationship_1",
	name: "was recorded by",
	subjectEntityType: EntityType.AudioItem,
	objectEntityType: EntityType.Person,
	createdByUserId: user1.id,
};
const relationship2: Pick<
	Relationship,
	"id" | "name" | "subjectEntityType" | "objectEntityType" | "createdByUserId"
> = {
	id: "relationship_2",
	name: "is contained in",
	subjectEntityType: EntityType.AudioItem,
	objectEntityType: EntityType.Collection,
	createdByUserId: user1.id,
};
const tag1: Pick<
	Tag,
	| "id"
	| "subjectAudioItemId"
	| "objectPersonId"
	| "relationshipId"
	| "createdByUserId"
> = {
	id: "tag_1",
	subjectAudioItemId: audioItem1.id,
	objectPersonId: person1.id,
	relationshipId: relationship1.id,
	createdByUserId: user1.id,
};
const tag2: Pick<
	Tag,
	| "id"
	| "subjectAudioItemId"
	| "objectCollectionId"
	| "relationshipId"
	| "createdByUserId"
> = {
	id: "tag_2",
	subjectAudioItemId: audioItem1.id,
	objectCollectionId: collection1.id,
	relationshipId: relationship2.id,
	createdByUserId: user1.id,
};
const comment1: Pick<
	Comment,
	"id" | "text" | "parentAudioItemId" | "createdByUserId"
> = {
	id: "comment_1",
	text: "This recording is fantastic.",
	parentAudioItemId: audioItem1.id,
	createdByUserId: user1.id,
};

async function main() {
	await prisma.user.upsert({
		where: {
			id: user1.id,
		},
		update: user1,
		create: user1,
	});
	await prisma.audioItem.upsert({
		where: {
			slug: audioItem1.slug,
		},
		update: audioItem1,
		create: audioItem1,
	});
	await prisma.collection.upsert({
		where: {
			slug: collection1.slug,
		},
		update: collection1,
		create: collection1,
	});
	await prisma.person.upsert({
		where: {
			slug: person1.slug,
		},
		update: person1,
		create: person1,
	});
	await prisma.relationship.upsert({
		where: {
			id: relationship1.id,
		},
		update: relationship1,
		create: relationship1,
	});
	await prisma.relationship.upsert({
		where: {
			id: relationship2.id,
		},
		update: relationship2,
		create: relationship2,
	});
	await prisma.tag.upsert({
		where: {
			id: tag1.id,
		},
		update: tag1,
		create: tag1,
	});
	await prisma.tag.upsert({
		where: {
			id: tag2.id,
		},
		update: tag2,
		create: tag2,
	});
	await prisma.comment.upsert({
		where: {
			id: comment1.id,
		},
		update: comment1,
		create: comment1,
	});
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
