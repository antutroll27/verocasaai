import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  out: './drizzle',
  schema: './config/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://verocasadb_owner:lZa2sHtGwvy0@ep-black-resonance-a5pf2o19.us-east-2.aws.neon.tech/verocasadb?sslmode=require'
  },
});