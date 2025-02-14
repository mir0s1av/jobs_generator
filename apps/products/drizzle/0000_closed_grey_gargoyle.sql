CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" text,
	"name" text,
	"category" text,
	"price" real,
	"stock" integer,
	"rating" real,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "products_uuid_unique" UNIQUE("uuid")
);
