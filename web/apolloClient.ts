import { ApolloClient, InMemoryCache } from "@apollo/client";

const { NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF } = process.env;

let graphqlPath = "/graphql";
let apiUrl = `http://localhost:4000${graphqlPath}`;
if (typeof NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF === "string") {
	apiUrl = `https://api-${NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF}.tradarchive.com${graphqlPath}`;
}

export const apolloClient = new ApolloClient({
	uri: apiUrl,
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
						merge(_, incoming) {
							// Just return incoming results until pagination is implemented
							return incoming;
						},
					},
				},
			},
			Person: {
				fields: {
					// Replace tags field entirely when an updated Person result is added
					// to the cache
					tags: {
						merge: false,
					},
				},
			},
			Instrument: {
				fields: {
					tags: {
						merge: false,
					},
				},
			},
			Place: {
				fields: {
					tags: {
						merge: false,
					},
				},
			},
			Tune: {
				fields: {
					tags: {
						merge: false,
					},
				},
			},
			AudioItem: {
				fields: {
					tags: {
						merge: false,
					},
				},
			},
		},
	}),
});
