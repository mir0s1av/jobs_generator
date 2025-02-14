CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" text,
	"name" text,
	"charge" integer,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "categories_uuid_unique" UNIQUE("uuid"),
	CONSTRAINT "categories_name_unique" UNIQUE("name")
);
