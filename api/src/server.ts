import "reflect-metadata";
import { ApolloServer as ApolloServerLambda } from "apollo-server-lambda";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import { createCustomContext } from "middleware/context";
const apolloServerPlugins = require("middleware/plugins");
import { authChecker } from "middleware/authChecker";

import { AuthResolver } from "resolvers/AuthResolver";
import { UserResolver } from "resolvers/UserResolver";
import { TagResolver } from "resolvers/TagResolver";
import { RelationshipResolver } from "resolvers/RelationshipResolver";
import { CommentResolver } from "resolvers/CommentResolver";
import { SavedItemResolver } from "resolvers/SavedItemResolver";
import { TakedownRequestResolver } from "resolvers/TakedownRequestResolver";
import { VerificationRequestResolver } from "resolvers/VerificationRequestResolver";
import { EntityResolver } from "resolvers/EntityResolver";
import { AudioItemResolver } from "resolvers/AudioItemResolver";
import { PersonResolver } from "resolvers/PersonResolver";
import { InstrumentResolver } from "resolvers/InstrumentResolver";
import { PlaceResolver } from "resolvers/PlaceResolver";
import { TuneResolver } from "resolvers/TuneResolver";
import { CollectionResolver } from "resolvers/CollectionResolver";

const makeSchema = () => {
	return buildSchema({
		resolvers: [
			AuthResolver,
			UserResolver,
			TagResolver,
			RelationshipResolver,
			CommentResolver,
			SavedItemResolver,
			TakedownRequestResolver,
			VerificationRequestResolver,
			EntityResolver,
			AudioItemResolver,
			PersonResolver,
			InstrumentResolver,
			PlaceResolver,
			TuneResolver,
			CollectionResolver,
		],
		dateScalarMode: "isoDate",
		authChecker,
		authMode: "null",
	});
};

export const initializeApolloServerLambda = async () => {
	const schema = await makeSchema();
	return new ApolloServerLambda({
		schema,
		plugins: apolloServerPlugins,
		context: ({ event, context }) => createCustomContext(event, context),
	});
};

export const initializeApolloServer = async () => {
	const schema = await makeSchema();
	return new ApolloServer({
		schema,
		plugins: apolloServerPlugins,
		context: (args) => {
			console.log(args);
		},
		// TODO: cors:
	});
};
