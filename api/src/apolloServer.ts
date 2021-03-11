import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-lambda';
import { getConnectionManager } from 'typeorm';
import { buildSchema } from 'type-graphql';
import {
  APIGatewayProxyCallback,
  APIGatewayProxyEvent,
  Context as LambdaContext,
} from 'aws-lambda';

import { connectToDatabase, DB_CONNECTION_NAME } from 'db';
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

const dbConnectionManager = getConnectionManager();
const dbIsConnected = dbConnectionManager.has(DB_CONNECTION_NAME);
console.log('starting up Lambda, dbIsConnected?', dbIsConnected);

const createServer = async () => {
  console.log('creating server, dbIsConnected?', dbIsConnected);
  if (!dbIsConnected) {
    console.log('not connected, connect');
    await connectToDatabase();
  }

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
    let allowedOrigin;
    switch (SERVERLESS_STAGE) {
      case 'dev':
        allowedOrigin = 'http://localhost:3000';
        break;
      case 'prod':
        allowedOrigin = 'https://www.tradarchive.com';
        break;
      default:
        allowedOrigin = `https://trad-archive-git-${SERVERLESS_STAGE}-dangurney.vercel.app`;
    }
    const handler = server.createHandler({
      cors: {
        origin: allowedOrigin,
        credentials: true,
      },
    });
    return handler(event, context, callback);
  });
};
