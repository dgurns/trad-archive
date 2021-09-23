import { getManager } from "typeorm";
import { EntityType } from "models/entities/base";
import { Relationship } from "models/Relationship";

interface RelationshipToSeed {
	subjectEntityType: EntityType;
	objectEntityType: EntityType;
	name: string;
}

const audioItemRelationshipsToSeed: RelationshipToSeed[] = [
	{
		subjectEntityType: EntityType.AudioItem,
		objectEntityType: EntityType.Collection,
		name: "is contained in",
	},
	{
		subjectEntityType: EntityType.AudioItem,
		objectEntityType: EntityType.Instrument,
		name: "contains",
	},
	{
		subjectEntityType: EntityType.AudioItem,
		objectEntityType: EntityType.Person,
		name: "has performer",
	},
	{
		subjectEntityType: EntityType.AudioItem,
		objectEntityType: EntityType.Place,
		name: "was recorded in",
	},
	{
		subjectEntityType: EntityType.AudioItem,
		objectEntityType: EntityType.Tune,
		name: "contains",
	},
];

const collectionRelationshipsToSeed: RelationshipToSeed[] = [
	{
		subjectEntityType: EntityType.Collection,
		objectEntityType: EntityType.AudioItem,
		name: "contains",
	},
	{
		subjectEntityType: EntityType.Collection,
		objectEntityType: EntityType.Person,
		name: "was collected by",
	},
	{
		subjectEntityType: EntityType.Collection,
		objectEntityType: EntityType.Tune,
		name: "contains",
	},
];

const instrumentRelationshipsToSeed: RelationshipToSeed[] = [
	{
		subjectEntityType: EntityType.Instrument,
		objectEntityType: EntityType.AudioItem,
		name: "is played in",
	},
	{
		subjectEntityType: EntityType.Instrument,
		objectEntityType: EntityType.Person,
		name: "is played by",
	},
];

const personRelationshipsToSeed: RelationshipToSeed[] = [
	{
		subjectEntityType: EntityType.Person,
		objectEntityType: EntityType.AudioItem,
		name: "is performer in",
	},
	{
		subjectEntityType: EntityType.Person,
		objectEntityType: EntityType.Collection,
		name: "is collector of",
	},
	{
		subjectEntityType: EntityType.Person,
		objectEntityType: EntityType.Instrument,
		name: "plays",
	},
	{
		subjectEntityType: EntityType.Person,
		objectEntityType: EntityType.Place,
		name: "was born in",
	},
	{
		subjectEntityType: EntityType.Person,
		objectEntityType: EntityType.Place,
		name: "was resident of",
	},
	{
		subjectEntityType: EntityType.Person,
		objectEntityType: EntityType.Tune,
		name: "is composer of",
	},
];

const placeRelationshipsToSeed: RelationshipToSeed[] = [
	{
		subjectEntityType: EntityType.Place,
		objectEntityType: EntityType.AudioItem,
		name: "is recording location of",
	},
	{
		subjectEntityType: EntityType.Place,
		objectEntityType: EntityType.Person,
		name: "is birthplace of",
	},
	{
		subjectEntityType: EntityType.Place,
		objectEntityType: EntityType.Person,
		name: "had resident",
	},
];

const tuneRelationshipsToSeed: RelationshipToSeed[] = [
	{
		subjectEntityType: EntityType.Tune,
		objectEntityType: EntityType.AudioItem,
		name: "is contained in",
	},
	{
		subjectEntityType: EntityType.Tune,
		objectEntityType: EntityType.Collection,
		name: "is contained in",
	},
	{
		subjectEntityType: EntityType.Tune,
		objectEntityType: EntityType.Person,
		name: "was composed by",
	},
];

const relationshipsToSeed: RelationshipToSeed[] = [
	...audioItemRelationshipsToSeed,
	...collectionRelationshipsToSeed,
	...instrumentRelationshipsToSeed,
	...personRelationshipsToSeed,
	...placeRelationshipsToSeed,
	...tuneRelationshipsToSeed,
];

// seedRelationshipInDb seeds a single relationship in the DB if it doesn't
// already exist.
const seedRelationshipInDb = async (relationship: RelationshipToSeed) => {
	const existingInDb = await getManager()
		.createQueryBuilder(Relationship, "r")
		.where("r.subjectEntityType = :subjectEntityType", {
			subjectEntityType: relationship.subjectEntityType,
		})
		.andWhere("r.objectEntityType = :objectEntityType", {
			objectEntityType: relationship.objectEntityType,
		})
		.andWhere("r.name = :name", {
			name: relationship.name,
		})
		.getRawOne();
	if (Boolean(existingInDb)) {
		return;
	} else {
		const newInDb = Relationship.create({
			subjectEntityType: relationship.subjectEntityType,
			objectEntityType: relationship.objectEntityType,
			name: relationship.name,
		});
		await newInDb.save();
	}
};

// seedRelationshipsInDb seeds a predefined set of Relationships into the DB. If
// a Relationship already exists, it won't do anything; otherwise it will save a
// new record.
export const seedRelationshipsInDb = async () => {
	// To minimize performance impact, check the DB for the final seed to
	// determine if seeding has already happened
	// const example = [...relationshipsToSeed].pop();
	// if (!example) {
	// 	return;
	// }
	// const exampleInDb = await getManager()
	// 	.createQueryBuilder(Relationship, "r")
	// 	.where("r.subjectEntityType = :subjectEntityType", {
	// 		subjectEntityType: example.subjectEntityType,
	// 	})
	// 	.andWhere("r.objectEntityType = :objectEntityType", {
	// 		objectEntityType: example.objectEntityType,
	// 	})
	// 	.andWhere("r.name = :name", {
	// 		name: example.name,
	// 	})
	// 	.getRawOne();
	// if (Boolean(exampleInDb)) {
	// 	return;
	// }
	// Otherwise, seed the Relationships
	const promises = relationshipsToSeed.map((relationship) =>
		seedRelationshipInDb(relationship)
	);
	await Promise.allSettled(promises);
};
