import { ApolloClient, InMemoryCache } from "@apollo/client";
import compareDesc from "date-fns/compareDesc";

const { NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF } = process.env;

let graphqlPath = "/graphql";
let apiUrl = `http://localhost:4000${graphqlPath}`;
if (typeof NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF === "string") {
	apiUrl = `https://api-${NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF}.tradarchive.com${graphqlPath}`;
}
export const API_URL = apiUrl;

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
						keyArgs: false,
						merge(existing, incoming) {
							return incoming ?? existing;
						},
					},
					entity: {
						keyArgs: false,
						merge(existing, incoming, { mergeObjects }) {
							return mergeObjects(existing, incoming);
						},
					},
					tags: {
						keyArgs: false,
						merge(_, incoming) {
							// Just return incoming results until pagination is implemented
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
