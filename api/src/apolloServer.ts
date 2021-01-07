import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-lambda';
import { buildSchema } from 'type-graphql';
import {
  APIGatewayProxyCallback,
  APIGatewayProxyEvent,
  Context as LambdaContext,
} from 'aws-lambda';

import { connectToDatabase } from 'db';
import { UserResolver } from 'resolvers/UserResolver';

const createServer = async () => {
  await connectToDatabase();

  const schema = await buildSchema({
    resolvers: [UserResolver],
    dateScalarMode: 'isoDate',
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ event, context }) => ({
      event,
      context,
      user: 'authed user',
    }),
    formatResponse: (response: any, requestContext: any) => {
      // Check to see if the response includes an auth error. If so, set a
      // header signifying that to the client.
      if (requestContext.response && requestContext.response.http) {
        requestContext.response.http.headers.set(
          'user-auth',
          requestContext.context.user
        );
      }
      return response;
    },
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
