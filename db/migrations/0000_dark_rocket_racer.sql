CREATE TYPE "public"."milestone_type" AS ENUM('ON_TRACK', 'AT_RISK', 'COMPLETED');--> statement-breakpoint
CREATE TYPE "public"."transaction_type" AS ENUM('INCOME', 'EXPENSE');--> statement-breakpoint
CREATE TABLE "milestones" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"target_amount" numeric(15, 2) NOT NULL,
	"current_amount" numeric(15, 2) DEFAULT '0' NOT NULL,
	"due_date" timestamp with time zone,
	"status" "milestone_type" DEFAULT 'ON_TRACK' NOT NULL,
	"image_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"hashed_token" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "sessions_hashed_token_unique" UNIQUE("hashed_token")
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"amount" numeric(15, 2) NOT NULL,
	"type" "transaction_type" NOT NULL,
	"category" text NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"avatar_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "milestones" ADD CONSTRAINT "milestones_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "milestones_user_id_index" ON "milestones" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "sessions_user_id_index" ON "sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "sessions_expires_at_index" ON "sessions" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "transactions_user_id_index" ON "transactions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "transactions_date_index" ON "transactions" USING btree ("date");--> statement-breakpoint
CREATE INDEX "users_email_index" ON "users" USING btree ("email");