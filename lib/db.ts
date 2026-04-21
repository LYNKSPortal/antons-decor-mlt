import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Handle missing DATABASE_URL during build time
const databaseUrl = process.env.DATABASE_URL || 'postgresql://placeholder';
const sql = neon(databaseUrl);
export const db = drizzle(sql);
