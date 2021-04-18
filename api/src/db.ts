import { createConnection, getConnectionManager } from "typeorm";
import { User } from "models/User";
import { Tag } from "models/Tag";
import { Comment } from "models/Comment";
import { CollectionEntry } from "models/CollectionEntry";
import { Relationship } from "models/Relationship";
import { AudioItem } from "models/entities/AudioItem";
import { Person } from "models/entities/Person";
import { Instrument } from "models/entities/Instrument";
import { Place } from "models/entities/Place";
import { TakedownRequest } from "models/TakedownRequest";

const DB_CONNECTION_NAME = "default";

export const connectToDatabase = async () => {
	const dbConnection = await createConnection({
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
		],
		// TODO: Set synchronize to false in production
		synchronize: true,
		migrationsRun: true,
		migrations: ["src/migrations/*"],
		cli: {
			migrationsDir: "src/migrations",
		},
	});

	return dbConnection;

	// Add 'unaccent' PostgreSQL extension to enable accent-insensitive queries,
	// for example "unaccent(person.firstName) = Siobhan" would match "Siobhán"
	//
	// const queryRunner = connection.createQueryRunner();
	// await queryRunner.connect();
	// await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "unaccent"');
	// await queryRunner.release();
};

export const getDatabaseConnection = () => {
	try {
		return getConnectionManager().get(DB_CONNECTION_NAME);
	} catch {
		return undefined;
	}
};
