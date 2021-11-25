require("dotenv").config();
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { Connection } from "typeorm";
import express from "express";
import http from "http";
import compression from "compression";
import depthLimit from "graphql-depth-limit";

import { makeSchema } from "./server";
import { connectToDatabase } from "./db";

let dbConnection: Connection;

const start = async () => {
	try {
		dbConnection = await connectToDatabase();

		const app = express();
		app.use(compression());
		const httpServer = http.createServer(app);

		const schema = await makeSchema();
		const server = new ApolloServer({
			schema,
			validationRules: [depthLimit(7)],
			plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
		});
		await server.start();

		server.applyMiddleware({
			app,
			cors: {
				// This cors policy only applies to requests going to the GraphQL API
				origin: function (origin, callback) {
					if (process.env.NODE_ENV === "development") {
						return callback(null, true);
					} else if (
						origin &&
						(origin.includes("https://www.tradarchive.com") ||
							origin.includes("https://tradarchive.com") ||
							origin.includes("-dangurney.vercel.app"))
					) {
						return callback(null, true);
					} else {
						return callback(new Error("Request blocked by CORS"));
					}
				},
				credentials: true,
			},
		});

		await new Promise<void>((resolve) =>
			httpServer.listen({ port: 4000 }, resolve)
		);
		console.log(
			`🚀 GraphQL server ready on port 4000 at ${server.graphqlPath}`
		);
	} catch (error) {
		console.log(error);
		if (typeof dbConnection !== "undefined") {
			await dbConnection.close();
		}
	}
};

start();
