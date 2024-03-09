CREATE TABLE IF NOT EXISTS "Image" (
	"id" serial PRIMARY KEY NOT NULL,
	"descriptiveName" varchar NOT NULL,
	"storedName" varchar NOT NULL,
	"url" varchar NOT NULL,
	CONSTRAINT "Image_id_unique" UNIQUE("id"),
	CONSTRAINT "Image_storedName_unique" UNIQUE("storedName")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Product" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"priceNormal" integer NOT NULL,
	"priceOffer" integer,
	"visible" boolean NOT NULL,
	"quantity" integer,
	"id_image" integer,
	CONSTRAINT "Product_id_unique" UNIQUE("id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Product" ADD CONSTRAINT "Product_id_image_Image_id_fk" FOREIGN KEY ("id_image") REFERENCES "Image"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
