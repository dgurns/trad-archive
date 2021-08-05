import { createConnection, getConnectionManager } from "typeorm";
import ormConfig, { DB_CONNECTION_NAME } from "ormconfig";

export const connectToDatabase = () => {
	console.log("ORM CONFIG", ormConfig);
	return createConnection(ormConfig);

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
