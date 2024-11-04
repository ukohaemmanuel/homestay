import { Pool } from 'pg';
import { validateEnv } from './env.config';

const env = validateEnv();

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: env.DATABASE_SSL ? {
    rejectUnauthorized: false,
  } : false,
  max: env.DATABASE_MAX_CONNECTIONS,
  idleTimeoutMillis: env.DATABASE_IDLE_TIMEOUT,
});