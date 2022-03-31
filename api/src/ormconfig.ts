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
import { Submission } from "./models/Submission";
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

const sharedOrmConfig: ConnectionOptions = {
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
		Submission,
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
	...sharedOrmConfig,
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
			`/${SERVERLESS_STAGE}/DATABASE_NAME`,
			`/${SERVERLESS_STAGE}/DATABASE_PASSWORD`,
			`/${SERVERLESS_STAGE}/DATABASE_PORT`,
			`/${SERVERLESS_STAGE}/DATABASE_USERNAME`,
		]);
		if (!Parameters) {
			throw new Error("Error fetching SSM parameters");
		}
		// The order of the Parameters may not be deterministic, so we'll make sure
		const dbHost = Parameters.find(
			({ Name }) => Name === `/${SERVERLESS_STAGE}/DATABASE_HOST`
		);
		const dbName = Parameters.find(
			({ Name }) => Name === `/${SERVERLESS_STAGE}/DATABASE_NAME`
		);
		const dbPassword = Parameters.find(
			({ Name }) => Name === `/${SERVERLESS_STAGE}/DATABASE_PASSWORD`
		);
		const dbPort = Parameters.find(
			({ Name }) => Name === `/${SERVERLESS_STAGE}/DATABASE_PORT`
		);
		const dbUsername = Parameters.find(
			({ Name }) => Name === `/${SERVERLESS_STAGE}/DATABASE_USERNAME`
		);
		return {
			...sharedOrmConfig,
			host: dbHost?.Value,
			port: parseInt(dbPort?.Value ?? ""),
			username: dbUsername?.Value,
			password: dbPassword?.Value,
			database: dbName?.Value,
		};
	};

export default ormConfig;
