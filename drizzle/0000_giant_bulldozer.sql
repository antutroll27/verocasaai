CREATE TABLE IF NOT EXISTS "RedesignedAIRoomImage" (
	"imageID" serial PRIMARY KEY NOT NULL,
	"roomType" varchar NOT NULL,
	"AIRedesignType" varchar NOT NULL,
	"OgImage" varchar NOT NULL,
	"AIGeneratedImage" varchar NOT NULL,
	"userEmail" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(50) NOT NULL,
	"imageUrl" varchar NOT NULL,
	"credits" integer DEFAULT 10,
	"subscriptionStatus" varchar DEFAULT 'inactive',
	"subscriptionType" varchar DEFAULT 'free',
	"nextBillingDate" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_imageUrl_unique" UNIQUE("imageUrl")
);
