import { ApolloServer, gql } from 'apollo-server-micro';

const typeDefs = gql`
  type Query {
    sayHello: String
  }
`;

const resolvers = {
  Query: {
    sayHello() {
      return 'Hello World!';
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const handler = apolloServer.createHandler();

export default handler;