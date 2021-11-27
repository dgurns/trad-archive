import "reflect-metadata";
import { ApolloServer } from "apollo-server-lambda";
import { Connection } from "typeorm";
import {
	APIGatewayProxyCallback,
	APIGatewayProxyEvent,
	Context as LambdaContext,
} from "aws-lambda";

import { connectToDatabase } from "../db";
import { initializeApolloServerLambda } from "../apollo";

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
		apolloServer = await initializeApolloServerLambda();
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
