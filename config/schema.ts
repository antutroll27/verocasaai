
import { pgTable,varchar,integer,serial,timestamp } from "drizzle-orm/pg-core";

export const Users=pgTable('users',{
    id:serial('id').primaryKey(),
    name:varchar('name',{length:255}).notNull(),
    email:varchar('email',{length:50}).notNull().unique(),
    imageUrl:varchar('imageUrl').notNull().unique(),
    credits:integer('credits').default(4),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});