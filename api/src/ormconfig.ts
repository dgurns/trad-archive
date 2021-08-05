import { ConnectionOptions } from "typeorm";
import { User } from "models/User";
import { Tag } from "models/Tag";
import { Comment } from "models/Comment";
import { CollectionEntry } from "models/CollectionEntry";
import { Relationship } from "models/Relationship";
import { AudioItem } from "models/entities/AudioItem";
import { Person } from "models/entities/Person";
import { Instrument } from "models/entities/Instrument";
import { Place } from "models/entities/Place";
import { Tune } from "models/entities/Tune";
import { TakedownRequest } from "models/TakedownRequest";

export const DB_CONNECTION_NAME = "default";

const ormConfig: ConnectionOptions = {
	name: DB_CONNECTION_NAME,
	type: "postgres",
	host: process.env.DATABASE_HOST ?? "localhost",
	port: parseInt(process.env.DATABASE_PORT ?? "5432"),
	username: process.env.DATABASE_USERNAME ?? "postgres",
	password: process.env.DATABASE_PASSWORD ?? "password",
	database: process.env.DATABASE_NAME ?? "postgres",
	logging: false,
	entities: [
		User,
		Tag,
		Relationship,
		Comment,
		CollectionEntry,
		TakedownRequest,
		AudioItem,
		Person,
		Instrument,
		Place,
		Tune,
	],
	// TODO: Need to come up with a better migration solution for preview/prod
	synchronize: true,
	// migrationsRun: false,
	// migrations: [__dirname + "/migrations/*{.ts,.js}"],
	// cli: {
	// 	migrationsDir: __dirname + "/migrations",
	// },
};

export default ormConfig;
