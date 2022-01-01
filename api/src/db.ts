import { createConnection, getConnectionManager } from "typeorm";
import ormConfig, { DB_CONNECTION_NAME } from "./ormconfig";
import { seedRelationshipsInDbIfNotPresent } from "./seed/relationships";

export const connectToDatabase = async () => {
	console.log("DB HOST OK", process.env.DATABASE_HOST);
	const connection = await createConnection(ormConfig);
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
