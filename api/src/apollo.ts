import "reflect-metadata";
import { buildSchema } from "type-graphql";

import { authChecker } from "./middleware/authChecker";
import { AuthResolver } from "./resolvers/AuthResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { TagResolver } from "./resolvers/TagResolver";
import { RelationshipResolver } from "./resolvers/RelationshipResolver";
import { CommentResolver } from "./resolvers/CommentResolver";
import { SavedItemResolver } from "./resolvers/SavedItemResolver";
import { TakedownRequestResolver } from "./resolvers/TakedownRequestResolver";
import { VerificationRequestResolver } from "./resolvers/VerificationRequestResolver";
import { EntityResolver } from "./resolvers/EntityResolver";
import { AudioItemResolver } from "./resolvers/AudioItemResolver";
import { PersonResolver } from "./resolvers/PersonResolver";
import { InstrumentResolver } from "./resolvers/InstrumentResolver";
import { PlaceResolver } from "./resolvers/PlaceResolver";
import { TuneResolver } from "./resolvers/TuneResolver";
import { CollectionResolver } from "./resolvers/CollectionResolver";
import { StatsResolver } from "./resolvers/StatsResolver";

export const makeSchema = () => {
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
			StatsResolver,
		],
		dateScalarMode: "isoDate",
		authChecker,
		authMode: "null",
	});
};
