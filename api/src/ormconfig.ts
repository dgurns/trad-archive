import path from "path";
import { ConnectionOptions } from "typeorm";
import { User } from "./models/User";
import { Tag } from "./models/Tag";
import { Comment } from "./models/Comment";
import { SavedItem } from "./models/SavedItem";
import { Relationship } from "./models/Relationship";
import { AudioItem } from "./models/entities/AudioItem";
import { Person } from "./models/entities/Person";
import { Instrument } from "./models/entities/Instrument";
import { Place } from "./models/entities/Place";
import { Tune } from "./models/entities/Tune";
import { Collection } from "./models/entities/Collection";
import { TakedownRequest } from "./models/TakedownRequest";
import { VerificationRequest } from "./models/VerificationRequest";

const {
	SERVERLESS_STAGE,
	NODE_ENV,
	DATABASE_HOST,
	DATABASE_PORT,
	DATABASE_USERNAME,
	DATABASE_PASSWORD,
	DATABASE_NAME,
} = process.env;

export const DB_CONNECTION_NAME = "default";

const isDevelopment = SERVERLESS_STAGE === "dev" || NODE_ENV === "development";

const ormConfig: ConnectionOptions = {
	name: DB_CONNECTION_NAME,
	type: "mysql",
	host: DATABASE_HOST ?? "localhost",
	ssl: isDevelopment ? undefined : {},
	port: parseInt(DATABASE_PORT ?? "3306"),
	username: DATABASE_USERNAME ?? "admin",
	password: DATABASE_PASSWORD ?? "password",
	database: DATABASE_NAME ?? "trad_archive",
	logging: false,
	entities: [
		User,
		Tag,
		Relationship,
		Comment,
		SavedItem,
		TakedownRequest,
		VerificationRequest,
		AudioItem,
		Person,
		Instrument,
		Place,
		Tune,
		Collection,
	],
	synchronize: false,
	migrationsRun: false,
};

export default ormConfig;
