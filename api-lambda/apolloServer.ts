import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-lambda';
import { buildSchema } from 'type-graphql';

import { connectToDatabase } from './db';
import { UserResolver } from './resolvers/UserResolver';

export const createServer = async () => {
  await connectToDatabase();

  const schema = await buildSchema({
    resolvers: [UserResolver],
    dateScalarMode: 'isoDate',
  });

  const apolloServer = new ApolloServer({
    schema,
  });

  return apolloServer;
};
