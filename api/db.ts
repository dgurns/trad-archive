import { createConnection } from 'typeorm';

export const connectToDatabase = async () => {
  await createConnection({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT ?? ''),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    logging: false,
    entities: ['api/entities/*'],
    // TODO: Set synchronize to false in production
    synchronize: true,
    migrationsRun: true,
    migrations: ['api/migrations/*'],
    cli: {
      migrationsDir: 'api/migrations',
    },
  });
};
