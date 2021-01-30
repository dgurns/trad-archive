import { createConnection, getConnectionManager } from 'typeorm';
import { User } from 'entities/User';
import { Tag } from 'entities/Tag';
import { AudioItem } from 'entities/Item';
import {
  PlaceEntity,
  PersonEntity,
  InstrumentEntity,
  TuneEntity,
} from 'entities/Entity';

const DEFAULT_CONNECTION_NAME = 'default';

export const connectToDatabase = async () => {
  const connectionManager = getConnectionManager();
  const isConnected = connectionManager.has(DEFAULT_CONNECTION_NAME);
  if (isConnected) {
    return;
  }

  await createConnection({
    type: 'postgres',
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: parseInt(process.env.DATABASE_PORT ?? '5432'),
    username: process.env.DATABASE_USERNAME ?? 'postgres',
    password: process.env.DATABASE_PASSWORD ?? 'password',
    database: process.env.DATABASE_NAME ?? 'postgres',
    logging: false,
    entities: [
      User,
      Tag,
      AudioItem,
      PlaceEntity,
      PersonEntity,
      InstrumentEntity,
      TuneEntity,
    ],
    // TODO: Set synchronize to false in production
    synchronize: true,
    migrationsRun: true,
    migrations: ['src/migrations/*'],
    cli: {
      migrationsDir: 'src/migrations',
    },
  });
};
