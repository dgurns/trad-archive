import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-lambda';
import { buildSchema } from 'type-graphql';
import {
  APIGatewayProxyCallback,
  APIGatewayProxyEvent,
  Context as LambdaContext,
} from 'aws-lambda';

import { connectToDatabase } from 'db';
import { createCustomContext } from 'context';
import { authChecker } from 'auth';
import { AuthResolver } from 'resolvers/AuthResolver';
import { UserResolver } from 'resolvers/UserResolver';

const createServer = async () => {
  await connectToDatabase();

  const schema = await buildSchema({
    resolvers: [AuthResolver, UserResolver],
    dateScalarMode: 'isoDate',
    authChecker,
    authMode: 'null',
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ event, context }) => createCustomContext(event, context),
  });

  return apolloServer;
};

export const graphqlHandler = (
  event: APIGatewayProxyEvent,
  context: LambdaContext,
  callback: APIGatewayProxyCallback
) => {
  createServer().then((server) => {
    const handler = server.createHandler({
      cors: {
        // TODO: Set allowed origins
        origin: true,
        credentials: true,
      },
    });
    return handler(event, context, callback);
  });
};
