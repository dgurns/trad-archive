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
import { CollectionEntryResolver } from 'resolvers/CollectionEntryResolver';
import { EntityResolver } from 'resolvers/EntityResolver';
import { AudioItemResolver } from 'resolvers/AudioItemResolver';
import { PersonResolver } from 'resolvers/PersonResolver';
import { InstrumentResolver } from 'resolvers/InstrumentResolver';
import { PlaceResolver } from 'resolvers/PlaceResolver';

const { SERVERLESS_STAGE } = process.env;

const createServer = async () => {
  await connectToDatabase();

  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      UserResolver,
      TagResolver,
      RelationshipResolver,
      CommentResolver,
      CollectionEntryResolver,
      EntityResolver,
      AudioItemResolver,
      PersonResolver,
      InstrumentResolver,
      PlaceResolver,
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
    const requestOrigin = event.headers?.Origin;
    console.log('requestOrigin', requestOrigin);
    let origin;
    switch (SERVERLESS_STAGE) {
      case 'dev':
        origin = 'http://localhost:3000';
        break;
      case 'prod':
        origin = 'https://www.tradarchive.com';
        break;
      default:
        origin = `https://trad-archive-git-${SERVERLESS_STAGE}-dangurney.vercel.app`;
    }
    console.log('allowed origin', origin);
    const handler = server.createHandler({
      cors: {
        origin,
        credentials: true,
      },
    });
    return handler(event, context, callback);
  });
};
