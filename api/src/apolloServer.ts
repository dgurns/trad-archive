import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-lambda';
import { getConnectionManager, Connection } from 'typeorm';
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

// Connect to DB
let dbConnection: Connection | undefined;
console.log('lambda running - dbConnection?', dbConnection);
if (!dbConnection) {
  connectToDatabase()
    .then(() => {
      console.log('gonna connect');
      dbConnection = getConnectionManager().get(DB_CONNECTION_NAME);
      console.log('got connection, it is:', dbConnection);
    })
    .catch((error) => console.log(error));
}

console.log('gonna createServer');

// Create server
let apolloServer: ApolloServer | undefined;
buildSchema({
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
})
  .then((schema) => {
    console.log('schema built, create server');
    apolloServer = new ApolloServer({
      schema,
      plugins: apolloServerPlugins,
      context: ({ event, context }) => createCustomContext(event, context),
    });
  })
  .catch((error) => console.log(error));

console.log('dbConnection and server', dbConnection, apolloServer);

export const graphqlHandler = (
  event: APIGatewayProxyEvent,
  context: LambdaContext,
  callback: APIGatewayProxyCallback
) => {
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
  if (
    typeof dbConnection === 'undefined' ||
    typeof apolloServer === 'undefined'
  ) {
    console.log('whoops no DB or server!');
    return callback(new Error('Error initializing Lambda'));
  }
  const handler = apolloServer.createHandler({
    cors: {
      origin: allowedOrigin,
      credentials: true,
    },
  });
  return handler(event, context, callback);
};
