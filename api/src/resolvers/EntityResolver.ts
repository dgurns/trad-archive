import { Resolver, Query, Arg, createUnionType } from "type-graphql";
import { Entity, getManager } from "typeorm";

import { EntityType } from "../models/entities/base";
import { AudioItem } from "../models/entities/AudioItem";
import { Person } from "../models/entities/Person";
import { Instrument } from "../models/entities/Instrument";
import { Place } from "../models/entities/Place";
import { Tune } from "../models/entities/Tune";
import { Collection } from "../models/entities/Collection";
import { SearchEntitiesInput } from "./EntityResolverTypes";

// Entity is a type for representing any entity
export type Entity =
	| AudioItem
	| Person
	| Instrument
	| Place
	| Tune
	| Collection;

// EntityUnionType is a GraphQL union type returned by resolvers. It contains
// logic for GraphQL clients to distinguish the entity type represented by a
// value.
export const EntityUnion = createUnionType({
	name: "Entity",
	types: () => [AudioItem, Person, Instrument, Place, Tune, Collection],
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
			case EntityType.Tune:
				return Tune;
			case EntityType.Collection:
				return Collection;
			default:
				return undefined;
		}
	},
});

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
			}),
			Person.findOne({
				where: [{ id }, { slug }],
			}),
			Instrument.findOne({
				where: [{ id }, { slug }],
			}),
			Place.findOne({
				where: [{ id }, { slug }],
			}),
			Tune.findOne({
				where: [{ id }, { slug }],
			}),
			Collection.findOne({
				where: [{ id }, { slug }],
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
		const { searchTerm, entityTypes, take } = input;

		if (searchTerm.length < 3) {
			throw new Error("Must include a search term of at least 3 letters");
		}
		// Remove accents and quotes from search term and convert to lower case
		// https://stackoverflow.com/a/37511463/7426333
		const cleanedSearchTerm = searchTerm
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/["']/g, "")
			.toLowerCase();
		const takeFromEach = Math.round(take / (entityTypes?.length ?? 5));
		const entityManager = getManager();

		// Prepare the queries for each Entity type
		const personQuery = entityManager
			.createQueryBuilder(Person, "person")
			.leftJoinAndSelect("person.createdByUser", "createdByUser")
			.where("MATCH(name) AGAINST (:term IN NATURAL LANGUAGE MODE)", {
				term: cleanedSearchTerm,
			})
			.orWhere("MATCH(aliases) AGAINST (:term IN NATURAL LANGUAGE MODE)", {
				term: cleanedSearchTerm,
			})
			.orWhere("MATCH(description) AGAINST (:term IN NATURAL LANGUAGE MODE)", {
				term: cleanedSearchTerm,
			})
			.take(takeFromEach)
			.getMany();
		const instrumentQuery = entityManager
			.createQueryBuilder(Instrument, "instrument")
			.leftJoinAndSelect("instrument.createdByUser", "createdByUser")
			.where("MATCH(name) AGAINST (:term IN NATURAL LANGUAGE MODE)", {
				term: cleanedSearchTerm,
			})
			.orWhere("MATCH(aliases) AGAINST (:term IN NATURAL LANGUAGE MODE)", {
				term: cleanedSearchTerm,
			})
			.orWhere("MATCH(description) AGAINST (:term IN NATURAL LANGUAGE MODE)", {
				term: cleanedSearchTerm,
			})
			.take(takeFromEach)
			.getMany();
		const placeQuery = entityManager
			.createQueryBuilder(Place, "place")
			.leftJoinAndSelect("place.createdByUser", "createdByUser")
			.where("MATCH(name) AGAINST (:term IN NATURAL LANGUAGE MODE)", {
				term: cleanedSearchTerm,
			})
			.orWhere("MATCH(aliases) AGAINST (:term IN NATURAL LANGUAGE MODE)", {
				term: cleanedSearchTerm,
			})
			.orWhere("MATCH(description) AGAINST (:term IN NATURAL LANGUAGE MODE)", {
				term: cleanedSearchTerm,
			})
			.take(takeFromEach)
			.getMany();
		const tuneQuery = entityManager
			.createQueryBuilder(Tune, "tune")
			.leftJoinAndSelect("tune.createdByUser", "createdByUser")
			.where("MATCH(name) AGAINST (:term IN NATURAL LANGUAGE MODE)", {
				term: cleanedSearchTerm,
			})
			.take(takeFromEach)
			.getMany();
		const collectionQuery = entityManager
			.createQueryBuilder(Collection, "collection")
			.leftJoinAndSelect("collection.createdByUser", "createdByUser")
			.where("MATCH(name) AGAINST (:term IN NATURAL LANGUAGE MODE)", {
				term: cleanedSearchTerm,
			})
			.orWhere("MATCH(aliases) AGAINST (:term IN NATURAL LANGUAGE MODE)", {
				term: cleanedSearchTerm,
			})
			.orWhere("MATCH(description) AGAINST (:term IN NATURAL LANGUAGE MODE)", {
				term: cleanedSearchTerm,
			})
			.take(takeFromEach)
			.getMany();
		const audioItemQuery = entityManager
			.createQueryBuilder(AudioItem, "audioItem")
			.leftJoinAndSelect("audioItem.createdByUser", "createdByUser")
			.where("MATCH(name) AGAINST (:term IN NATURAL LANGUAGE MODE)", {
				term: cleanedSearchTerm,
			})
			.orWhere("MATCH(aliases) AGAINST (:term IN NATURAL LANGUAGE MODE)", {
				term: cleanedSearchTerm,
			})
			.orWhere("MATCH(description) AGAINST (:term IN NATURAL LANGUAGE MODE)", {
				term: cleanedSearchTerm,
			})
			.take(takeFromEach)
			.getMany();

		// Determine which queries to make
		let queryPromises = [];
		if (Array.isArray(entityTypes)) {
			for (const entityType of entityTypes) {
				switch (entityType) {
					case EntityType.Person:
						queryPromises.push(personQuery);
						break;
					case EntityType.Tune:
						queryPromises.push(tuneQuery);
						break;
					case EntityType.Instrument:
						queryPromises.push(instrumentQuery);
						break;
					case EntityType.Place:
						queryPromises.push(placeQuery);
						break;
					case EntityType.Collection:
						queryPromises.push(collectionQuery);
						break;
					case EntityType.AudioItem:
						queryPromises.push(audioItemQuery);
						break;
					default:
						break;
				}
			}
		} else {
			queryPromises = [
				personQuery,
				instrumentQuery,
				placeQuery,
				tuneQuery,
				collectionQuery,
				audioItemQuery,
			];
		}
		// Await the query results and return them
		const results = await Promise.all<Entity[]>(queryPromises);
		const output: Entity[] = [];
		results.forEach((resultArray) => output.push(...resultArray));
		return output;
	}
}
