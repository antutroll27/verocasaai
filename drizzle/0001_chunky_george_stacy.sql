ALTER TABLE "users" ADD COLUMN "subscription_status" varchar(20) DEFAULT 'inactive';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "subscription_type" varchar(20) DEFAULT 'free';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "next_billing_date" timestamp;