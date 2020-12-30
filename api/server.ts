import { ApolloServer } from 'apollo-server-micro';
import { buildSchema } from 'type-graphql';
import depthLimit from 'graphql-depth-limit';

import { connectToDatabase } from 'api/db';
import { UserResolver } from 'api/resolvers/UserResolver';

export const createServer = async () => {
  await connectToDatabase();

  const schema = await buildSchema({
    resolvers: [UserResolver],
    dateScalarMode: 'isoDate',
  });

  const apolloServer = new ApolloServer({
    schema,
    validationRules: [depthLimit(7)],
  });

  return apolloServer;
};
