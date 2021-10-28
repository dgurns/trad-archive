import { createConnection, getConnectionManager } from "typeorm";
import ormConfig, { DB_CONNECTION_NAME } from "ormconfig";

export const connectToDatabase = async () => {
	const connection = await createConnection(ormConfig);

	// Set up Postgres extensions and search indexes if they don't already exist
	//  - `unaccent` extension for stripping accents, for example Siobhán
	//  - `pg_trgm` extension for fuzzy text searching
	//  - gin indexes on tables to enable fuzzy text searching on each one
	const queryRunner = connection.createQueryRunner();
	await queryRunner.connect();
	await queryRunner.query('create extension if not exists "unaccent"');
	await queryRunner.query('create extension if not exists "pg_trgm"');
	await queryRunner.query(
		"create index if not exists idx_gin_person_search on person using gin (name gin_trgm_ops, aliases gin_trgm_ops, description gin_trgm_ops)"
	);
	await queryRunner.query(
		"create index if not exists idx_gin_instrument_search on instrument using gin (name gin_trgm_ops, aliases gin_trgm_ops, description gin_trgm_ops)"
	);
	await queryRunner.query(
		"create index if not exists idx_gin_place_search on place using gin (name gin_trgm_ops, aliases gin_trgm_ops, description gin_trgm_ops)"
	);
	await queryRunner.query(
		"create index if not exists idx_gin_audio_item_search on audio_item using gin (name gin_trgm_ops, aliases gin_trgm_ops, description gin_trgm_ops)"
	);
	await queryRunner.query(
		"create index if not exists idx_gin_tune_search on tune using gin (name gin_trgm_ops, aliases gin_trgm_ops)"
	);
	await queryRunner.query(
		"create index if not exists idx_gin_collection_search on collection using gin (name gin_trgm_ops, aliases gin_trgm_ops, description gin_trgm_ops)"
	);
	await queryRunner.release();

	return connection;
};

export const getDatabaseConnection = () => {
	try {
		return getConnectionManager().get(DB_CONNECTION_NAME);
	} catch {
		return undefined;
	}
};
