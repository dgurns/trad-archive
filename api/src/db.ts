import { createConnection, getConnectionManager } from "typeorm";
import ormConfig, {
	DB_CONNECTION_NAME,
	makeOrmConfigWithSSMEnvs,
} from "./ormconfig";
import { seedRelationshipsInDbIfNotPresent } from "./seed/relationships";

const {
	DATABASE_HOST,
	DATABASE_PORT,
	DATABASE_NAME,
	DATABASE_USERNAME,
	DATABASE_PASSWORD,
} = process.env;

export const connectToDatabase = async () => {
	let ormConfigToUse = ormConfig;
	// If any of the required envs are not set locally, get them from SSM
	if (
		!DATABASE_HOST ||
		!DATABASE_PORT ||
		!DATABASE_NAME ||
		!DATABASE_USERNAME ||
		!DATABASE_PASSWORD
	) {
		ormConfigToUse = await makeOrmConfigWithSSMEnvs();
	}
	const connection = await createConnection(ormConfigToUse);
	await seedRelationshipsInDbIfNotPresent();
	return connection;
};

export const getDatabaseConnection = () => {
	try {
		return getConnectionManager().get(DB_CONNECTION_NAME);
	} catch {
		return undefined;
	}
};
