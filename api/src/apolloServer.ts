import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-lambda';
import { buildSchema } from 'type-graphql';
import {
  APIGatewayProxyCallback,
  APIGatewayProxyEvent,
  Context as LambdaContext,
} from 'aws-lambda';

import { connectToDatabase } from 'db';
import { createCustomContext } from 'middleware/context';
const apolloServerPlugins = require('middleware/plugins');
import { authChecker } from 'middleware/authChecker';
import { AuthResolver } from 'resolvers/AuthResolver';
import { UserResolver } from 'resolvers/UserResolver';
import { TagResolver } from 'resolvers/TagResolver';
import { RelationshipResolver } from 'resolvers/RelationshipResolver';
import { CommentResolver } from 'resolvers/CommentResolver';
import { EntityResolver } from 'resolvers/EntityResolver';
import { AudioItemResolver } from 'resolvers/AudioItemResolver';
import { PersonResolver } from 'resolvers/PersonResolver';
import { InstrumentResolver } from 'resolvers/InstrumentResolver';

const createServer = async () => {
  await connectToDatabase();

  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      UserResolver,
      TagResolver,
      RelationshipResolver,
      CommentResolver,
      EntityResolver,
      AudioItemResolver,
      PersonResolver,
      InstrumentResolver,
    ],
    dateScalarMode: 'isoDate',
    authChecker,
    authMode: 'null',
  });

  const apolloServer = new ApolloServer({
    schema,
    plugins: apolloServerPlugins,
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
