import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_GRAPHQL_URL,
  credentials: 'include',
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
