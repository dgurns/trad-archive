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

export const DB_CONNECTION_NAME = "default";

const ormConfig: ConnectionOptions = {
	name: DB_CONNECTION_NAME,
	type: "mysql",
	host: process.env.DATABASE_HOST ?? "localhost",
	port: parseInt(process.env.DATABASE_PORT ?? "3306"),
	username: process.env.DATABASE_USERNAME ?? "admin",
	password: process.env.DATABASE_PASSWORD ?? "password",
	database: process.env.DATABASE_NAME ?? "trad_archive",
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
	migrationsRun: true,
	migrations: [path.resolve(__dirname, "../migrations/**/*.js")],
	cli: {
		migrationsDir: __dirname + "/migrations",
	},
};

export default ormConfig;
