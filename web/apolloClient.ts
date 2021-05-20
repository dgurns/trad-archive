import { ApolloClient, InMemoryCache } from "@apollo/client";
import compareDesc from "date-fns/compareDesc";

const { NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF } = process.env;

let graphqlPath = "/graphql";
let apiUrl = `http://localhost:4000${graphqlPath}`;
if (typeof NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF === "string") {
	apiUrl = `https://api-${NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF}.tradarchive.com${graphqlPath}`;
}
export const API_URL = apiUrl;

// mergeArrayById holds logic for merging incoming arrays to the cache. If an
// incoming array item ID already exists in the cache, it will replace the
// existing item. Otherwise it will be added to the end of the cached items.
const mergeArrayById = (
	existing: any[],
	incoming: any[],
	{ readField, mergeObjects }
) => {
	const merged: any[] = existing ? existing.slice(0) : [];
	const idToIndex: Record<string, number> = Object.create(null);
	if (existing) {
		existing.forEach((item, index) => {
			idToIndex[readField("id", item)] = index;
		});
	}
	if (incoming) {
		incoming.forEach((item) => {
			const id = readField("id", item);
			const index = idToIndex[id];
			if (typeof index === "number") {
				// Merge the new item data with the existing item data.
				merged[index] = mergeObjects(merged[index], item);
			} else {
				// First time we've seen this item in this array.
				idToIndex[id] = merged.length;
				merged.push(item);
			}
		});
	}
	return merged;
};

export const apolloClient = new ApolloClient({
	uri: API_URL,
	credentials: "include",
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					audioItems: {
						keyArgs: false,
						// When new results are received for this query via fetchMore
						// pagination, specify how to merge them with cached results
						merge(existing = [], incoming, { args: { input } }) {
							const { skip = 0 } = input;
							const merged = existing ? existing.slice(0) : [];
							for (let i = 0; i < incoming.length; ++i) {
								merged[skip + i] = incoming[i];
							}
							return merged;
						},
					},
					audioItemsTaggedWithEntity: {
						// Namespace cached results for this query based on requested
						// entity ID
						keyArgs: (args) => args.input.entityId,
						merge(existing = [], incoming, { args: { input } }) {
							const { skip = 0 } = input;
							const merged = existing ? existing.slice(0) : [];
							for (let i = 0; i < incoming.length; ++i) {
								merged[skip + i] = incoming[i];
							}
							return merged;
						},
					},
					collectionEntriesForUser: {
						keyArgs: false,
						merge(existing, incoming) {
							// Just return incoming results until pagination is implemented
							return incoming ?? existing;
						},
					},
					comments: {
						// Use shared cache for this query regardless of args like `take` or
						// `skip`
						keyArgs: false,
						merge: mergeArrayById,
					},
					entity: {
						keyArgs: false,
						merge(existing, incoming, { mergeObjects }) {
							return mergeObjects(existing, incoming);
						},
					},
					tags: {
						merge(_, incoming) {
							return incoming;
						},
					},
				},
			},
			AudioItem: {
				fields: {
					tags: {
						merge(existing, incoming) {
							// If incoming `tags` field value is `null` or `undefined`, don't
							// overwrite the existing field value in the cache.
							return incoming ?? existing;
						},
					},
					createdByUser: {
						merge(existing, incoming) {
							return { ...existing, ...incoming };
						},
					},
				},
			},
			CollectionEntry: {
				fields: {
					audioItem: {
						merge(existing, incoming, { mergeObjects }) {
							return mergeObjects(existing, incoming);
						},
					},
				},
			},
			Comment: {
				fields: {
					parentAudioItem: {
						// If any nested fields of the incoming parentAudioItem have custom
						// merge behavior, mergeObjects ensure that the custom merge
						// functions will be called recursively.
						merge(existing, incoming, { mergeObjects }) {
							return mergeObjects(existing, incoming);
						},
					},
					createdByUser: {
						merge(existing, incoming) {
							return { ...existing, ...incoming };
						},
					},
				},
			},
			Instrument: {
				fields: {
					tags: {
						merge(existing, incoming) {
							return incoming ?? existing;
						},
					},
				},
			},
			Person: {
				fields: {
					tags: {
						merge(existing, incoming) {
							return incoming ?? existing;
						},
					},
				},
			},
			Place: {
				fields: {
					tags: {
						merge(existing, incoming) {
							return incoming ?? existing;
						},
					},
				},
			},
			Tag: {
				fields: {
					subjectEntity: {
						merge(existing, incoming, { mergeObjects }) {
							return mergeObjects(existing, incoming);
						},
					},
					objectEntity: {
						merge(existing, incoming, { mergeObjects }) {
							return mergeObjects(existing, incoming);
						},
					},
					createdByUser: {
						merge(existing, incoming) {
							return { ...existing, ...incoming };
						},
					},
				},
			},
			Tune: {
				fields: {
					tags: {
						merge(existing, incoming) {
							return incoming ?? existing;
						},
					},
				},
			},
		},
	}),
});
