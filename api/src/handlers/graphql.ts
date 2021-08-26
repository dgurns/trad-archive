import "reflect-metadata";
import { ApolloServer } from "apollo-server-lambda";
import { Connection } from "typeorm";
import { buildSchema } from "type-graphql";
import {
	APIGatewayProxyCallback,
	APIGatewayProxyEvent,
	Context as LambdaContext,
} from "aws-lambda";

import { connectToDatabase } from "db";
import { createCustomContext } from "middleware/context";
const apolloServerPlugins = require("middleware/plugins");
import { authChecker } from "middleware/authChecker";
import { AuthResolver } from "resolvers/AuthResolver";
import { UserResolver } from "resolvers/UserResolver";
import { TagResolver } from "resolvers/TagResolver";
import { RelationshipResolver } from "resolvers/RelationshipResolver";
import { CommentResolver } from "resolvers/CommentResolver";
import { CollectionEntryResolver } from "resolvers/CollectionEntryResolver";
import { TakedownRequestResolver } from "resolvers/TakedownRequestResolver";
import { UserVerificationRequestResolver } from "resolvers/UserVerificationRequestResolver";
import { EntityResolver } from "resolvers/EntityResolver";
import { AudioItemResolver } from "resolvers/AudioItemResolver";
import { PersonResolver } from "resolvers/PersonResolver";
import { InstrumentResolver } from "resolvers/InstrumentResolver";
import { PlaceResolver } from "resolvers/PlaceResolver";
import { TuneResolver } from "resolvers/TuneResolver";

const { SERVERLESS_STAGE } = process.env;

// Store the DB and server outside of the Lambda handler so they can persist
// between invocations once they are created.
let dbConnection: Connection | undefined;
let apolloServer: ApolloServer | undefined;

const initializeServer = async () => {
	if (typeof dbConnection === "undefined") {
		dbConnection = await connectToDatabase();
	}

	if (typeof apolloServer === "undefined") {
		const schema = await buildSchema({
			resolvers: [
				AuthResolver,
				UserResolver,
				TagResolver,
				RelationshipResolver,
				CommentResolver,
				CollectionEntryResolver,
				TakedownRequestResolver,
				UserVerificationRequestResolver,
				EntityResolver,
				AudioItemResolver,
				PersonResolver,
				InstrumentResolver,
				PlaceResolver,
				TuneResolver,
			],
			dateScalarMode: "isoDate",
			authChecker,
			authMode: "null",
		});

		apolloServer = new ApolloServer({
			schema,
			plugins: apolloServerPlugins,
			context: ({ event, context }) => createCustomContext(event, context),
		});
	}

	return apolloServer;
};

// handler takes incoming requests from API Gateway and handles them via an
// Apollo Server GraphQL API
export const handler = (
	event: APIGatewayProxyEvent,
	context: LambdaContext,
	callback: APIGatewayProxyCallback
) => {
	context.callbackWaitsForEmptyEventLoop = false;

	let allowedOrigin: string | undefined;
	switch (SERVERLESS_STAGE) {
		case "dev":
			allowedOrigin = "http://localhost:3000";
			break;
		case "prod":
			allowedOrigin = "https://www.tradarchive.com";
			break;
		default:
			allowedOrigin = `https://trad-archive-git-${SERVERLESS_STAGE}-dangurney.vercel.app`;
	}

	initializeServer().then((apolloServer) => {
		const apolloServerHandler = apolloServer.createHandler({
			cors: {
				origin: allowedOrigin,
				credentials: true,
			},
		});
		return apolloServerHandler(event, context, callback);
	});
};
