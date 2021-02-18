import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_GRAPHQL_URL,
  credentials: 'include',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Enable pagination for queries
          audioItems: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
          audioItemsTaggedWithEntity: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
      // Replace tags field entirely when a new Person is fetched
      Person: {
        fields: {
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
