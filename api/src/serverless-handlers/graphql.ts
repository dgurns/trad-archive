import "reflect-metadata";
import { ApolloServer } from "apollo-server-lambda";
import { GraphQLSchema } from "graphql";
import { Connection } from "typeorm";
import {
	APIGatewayProxyCallback,
	APIGatewayProxyEvent,
	Context as LambdaContext,
} from "aws-lambda";

import { createCustomContext } from "../middleware/context";
const apolloServerPlugins = require("../middleware/plugins");
import { connectToDatabase } from "../db";
import { makeSchema } from "../apollo";

const { SERVERLESS_STAGE } = process.env;

// Store variables outside of the Lambda handler so they can persist between
// invocations once they are created.
let dbConnection: Connection | undefined;
let graphQLSchema: GraphQLSchema | undefined;
let apolloServer: ApolloServer | undefined;

const initializeServer = async () => {
	if (typeof dbConnection === "undefined") {
		dbConnection = await connectToDatabase();
	}
	const start = Date.now();
	if (typeof graphQLSchema === "undefined") {
		graphQLSchema = await makeSchema();
	}
	console.log("Made or fetched GraphQL schema, took ms:", Date.now() - start);
	if (typeof apolloServer === "undefined") {
		apolloServer = new ApolloServer({
			schema: graphQLSchema,
			plugins: apolloServerPlugins,
			context: createCustomContext,
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
