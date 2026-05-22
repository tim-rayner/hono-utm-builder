CREATE TABLE "links" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(64) NOT NULL,
	"base_url" text NOT NULL,
	"utm_source" varchar(255),
	"utm_medium" varchar(255),
	"utm_campaign" varchar(255),
	"utm_term" varchar(255),
	"utm_content" varchar(255),
	"full_url" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "links_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "visits" (
	"id" serial PRIMARY KEY NOT NULL,
	"link_code" varchar(64) NOT NULL,
	"visited_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ip" varchar(64),
	"user_agent" text,
	"referrer" text
);
--> statement-breakpoint
ALTER TABLE "visits" ADD CONSTRAINT "visits_link_code_links_code_fk" FOREIGN KEY ("link_code") REFERENCES "public"."links"("code") ON DELETE no action ON UPDATE no action;