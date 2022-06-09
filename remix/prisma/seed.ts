import { PrismaClient, EntityType } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	const audioItem = await prisma.audioItem.create({
		data: {
			name: "Rare recording of Michael Coleman",
			description: "This was unearthed in an old audio tape in the attic.",
			slug: "rare-recording-of-michael-coleman",
		},
	});
	const person = await prisma.person.create({
		data: {
			name: "Seamus Ennis",
			description: "Uilleann piper and collector",
			slug: "seamus-ennis",
			firstName: "Seamus",
			lastName: "Ennis",
		},
	});
	const relationship = await prisma.relationship.create({
		data: {
			name: "was recorded by",
			subjectEntityType: EntityType.AudioItem,
			objectEntityType: EntityType.Person,
		},
	});
	await prisma.tag.create({
		data: {
			subjectAudioItemId: audioItem.id,
			objectPersonId: person.id,
			relationshipId: relationship.id,
		},
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
