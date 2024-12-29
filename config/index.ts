import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const sql = neon("postgresql://verocasadb_owner:lZa2sHtGwvy0@ep-black-resonance-a5pf2o19.us-east-2.aws.neon.tech/verocasadb?sslmode=require");
export const db = drizzle(sql);