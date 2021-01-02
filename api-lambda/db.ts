import { createConnection } from 'typeorm';

export const connectToDatabase = async () => {
  await createConnection({
    type: 'postgres',
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: parseInt(process.env.DATABASE_PORT ?? '5432'),
    username: process.env.DATABASE_USERNAME ?? 'postgres',
    password: process.env.DATABASE_PASSWORD ?? 'password',
    database: process.env.DATABASE_NAME ?? 'postgres',
    logging: false,
    entities: ['./entities/*'],
    // TODO: Set synchronize to false in production
    synchronize: true,
    migrationsRun: true,
    migrations: ['./migrations/*'],
    cli: {
      migrationsDir: './migrations',
    },
  });
};
