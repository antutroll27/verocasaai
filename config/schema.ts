
import { pgTable,varchar,integer,serial,timestamp } from "drizzle-orm/pg-core";

{/* User Details schema */}

export const Users=pgTable('users',{
    id:serial('id').primaryKey(),
    name:varchar('name',{length:255}).notNull(),
    email:varchar('email',{length:50}).notNull().unique(),
    imageUrl:varchar('imageUrl').notNull().unique(),
    credits:integer('credits').default(4),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

{/* AI Redesigned images storage schema */}

export const RedesignedAIRoomImage=pgTable('RedesignedAIRoomImage',{
    imageID:serial('imageID').primaryKey(),
    roomType:varchar('roomType').notNull(),
    AIRedesignType:varchar('AIRedesignType').notNull(),
    OgImage:varchar('OgImage').notNull(),
    AIGeneratedImage:varchar('IGeneratedImage').notNull(),
    userEmail:varchar('userEmail'),
}

);