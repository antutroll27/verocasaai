import { pgTable, varchar, integer, serial, timestamp } from "drizzle-orm/pg-core";

{/* User Details schema */ }

export const Users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 50 }).notNull().unique(),
    imageUrl: varchar('imageUrl').notNull().unique(),
    credits: integer('credits').default(10),
    subscriptionStatus: varchar('subscription_status', { length: 20 }).default('inactive'), // e.g., active, inactive, trial
    subscriptionType: varchar('subscription_type', { length: 20 }).default('free'), // free, monthly, yearly
    nextBillingDate: timestamp('next_billing_date'), // for subscription renewal
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

{/* AI Redesigned images storage schema */ }

export const RedesignedAIRoomImage = pgTable('RedesignedAIRoomImage', {
    imageID: serial('imageID').primaryKey(),
    roomType: varchar('roomType').notNull(),
    AIRedesignType: varchar('AIRedesignType').notNull(),
    OgImage: varchar('OgImage').notNull(),
    AIGeneratedImage: varchar('AIGeneratedImage').notNull(),
    userEmail: varchar('userEmail'),
    createdAt: timestamp('createdAt').defaultNow()
});