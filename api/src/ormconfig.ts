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
import SSMService from "./services/SSM";

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

const staticOrmConfig: ConnectionOptions = {
	name: DB_CONNECTION_NAME,
	type: "mysql",
	ssl: isDevelopment ? undefined : {},
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

const ormConfig: ConnectionOptions = {
	...staticOrmConfig,
	host: DATABASE_HOST ?? "localhost",
	port: parseInt(DATABASE_PORT ?? "3306"),
	username: DATABASE_USERNAME ?? "admin",
	password: DATABASE_PASSWORD ?? "password",
	database: DATABASE_NAME ?? "trad_archive",
};

export const makeOrmConfigWithSSMEnvs =
	async (): Promise<ConnectionOptions> => {
		const { Parameters } = await SSMService.getParameters([
			`/${SERVERLESS_STAGE}/DATABASE_HOST`,
			`/${SERVERLESS_STAGE}/DATABASE_PORT`,
			`/${SERVERLESS_STAGE}/DATABASE_USERNAME`,
			`/${SERVERLESS_STAGE}/DATABASE_PASSWORD`,
			`/${SERVERLESS_STAGE}/DATABASE_NAME`,
		]);
		if (!Parameters) {
			throw new Error("Error fetching SSM parameters");
		}
		const [dbHost, dbPort, dbUsername, dbPassword, dbName] = Parameters;
		return {
			...staticOrmConfig,
			host: dbHost.Value,
			port: parseInt(dbPort.Value ?? ""),
			username: dbUsername.Value,
			password: dbPassword.Value,
			database: dbName.Value,
		};
	};

export default ormConfig;
