import config from "./config";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

export const sql = neon(config.DATABASE_URL);
export const db = drizzle(sql, { schema, logger: true });
  