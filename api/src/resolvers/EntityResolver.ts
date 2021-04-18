import { Resolver, Query, Arg, createUnionType } from "type-graphql";
import { getManager } from "typeorm";

import { EntityType } from "models/entities/base";
import { AudioItem } from "models/entities/AudioItem";
import { Person } from "models/entities/Person";
import { Instrument } from "models/entities/Instrument";
import { Place } from "models/entities/Place";
import { SearchEntitiesInput } from "resolvers/EntityResolverTypes";

// Entity is a type for representing any entity
export type Entity = AudioItem | Person | Instrument | Place;

// EntityUnionType is a GraphQL union type returned by resolvers. It contains
// logic for GraphQL clients to distinguish the entity type represented by a
// value.
export const EntityUnion = createUnionType({
	name: "Entity",
	types: () => [AudioItem, Person, Instrument, Place],
	resolveType: (value) => {
		switch (value.entityType) {
			case EntityType.AudioItem:
				return AudioItem;
			case EntityType.Person:
				return Person;
			case EntityType.Instrument:
				return Instrument;
			case EntityType.Place:
				return Place;
			default:
				return undefined;
		}
	},
});

// entityRelationsForFind contains the necessary relations needed when querying
// for an Entity via `find()`, `findOne()`, etc. It does not fetch Tag relations
// for the subjectEntity since that is just the root Entity itself.
export const entityRelationsForFind = [
	"tags",
	"tags.objectAudioItem",
	"tags.objectPerson",
	"tags.objectInstrument",
	"tags.objectPlace",
];

// EntityResolver contains resolvers for querying across all entity types
@Resolver()
export class EntityResolver {
	@Query(() => EntityUnion, { nullable: true })
	async entity(
		@Arg("id", { nullable: true }) id?: string,
		@Arg("slug", { nullable: true }) slug?: string
	) {
		if (!id && !slug) {
			throw new Error("Must provide an ID or slug");
		}
		const results = await Promise.all([
			AudioItem.findOne({
				where: [{ id }, { slug }],
				relations: entityRelationsForFind,
			}),
			Person.findOne({
				where: [{ id }, { slug }],
				relations: entityRelationsForFind,
			}),
			Instrument.findOne({
				where: [{ id }, { slug }],
				relations: entityRelationsForFind,
			}),
			Place.findOne({
				where: [{ id }, { slug }],
				relations: entityRelationsForFind,
			}),
		]);
		let entity;
		results.forEach((result) => {
			if (result) {
				entity = result;
			}
		});
		return entity;
	}

	@Query(() => [EntityUnion])
	async searchEntities(@Arg("input") input: SearchEntitiesInput) {
		const { searchTerm, take } = input;

		if (searchTerm.length < 3) {
			throw new Error("Must include a search term of at least 3 letters");
		}
		const searchTermLowercased = searchTerm.toLowerCase();
		const takeFromEach = Math.round(take / 4);
		const entityManager = getManager();
		const results = await Promise.all([
			entityManager
				.createQueryBuilder(Person, "person")
				.leftJoinAndSelect("person.createdByUser", "createdByUser")
				.where("unaccent(LOWER(person.name)) LIKE unaccent(:name)", {
					name: `%${searchTermLowercased}%`,
				})
				.orWhere("unaccent(LOWER(person.aliases)) LIKE unaccent(:aliases)", {
					aliases: `%${searchTermLowercased}%`,
				})
				.take(takeFromEach)
				.getMany(),
			entityManager
				.createQueryBuilder(Instrument, "instrument")
				.leftJoinAndSelect("instrument.createdByUser", "createdByUser")
				.where("unaccent(LOWER(instrument.name)) LIKE unaccent(:name)", {
					name: `%${searchTermLowercased}%`,
				})
				.orWhere(
					"unaccent(LOWER(instrument.aliases)) LIKE unaccent(:aliases)",
					{ aliases: `%${searchTermLowercased}%` }
				)
				.take(takeFromEach)
				.getMany(),
			entityManager
				.createQueryBuilder(Place, "place")
				.leftJoinAndSelect("place.createdByUser", "createdByUser")
				.where("unaccent(LOWER(place.name)) LIKE unaccent(:name)", {
					name: `%${searchTermLowercased}%`,
				})
				.orWhere("unaccent(LOWER(place.aliases)) LIKE unaccent(:aliases)", {
					aliases: `%${searchTermLowercased}%`,
				})
				.take(takeFromEach)
				.getMany(),
			entityManager
				.createQueryBuilder(AudioItem, "audioItem")
				.leftJoinAndSelect("audioItem.createdByUser", "createdByUser")
				.where("unaccent(LOWER(audioItem.name)) LIKE unaccent(:name)", {
					name: `%${searchTermLowercased}%`,
				})
				.orWhere("unaccent(LOWER(audioItem.aliases)) LIKE unaccent(:aliases)", {
					aliases: `%${searchTermLowercased}%`,
				})
				.take(takeFromEach)
				.getMany(),
		]);
		const output: Entity[] = [];
		results.forEach((resultArray) => output.push(...resultArray));
		return output;
	}
}
