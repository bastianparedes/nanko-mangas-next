CREATE TABLE `Image` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`descriptiveName` text NOT NULL,
	`storedName` text NOT NULL,
	`url` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Product` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`priceNormal` integer NOT NULL,
	`priceOffer` integer,
	`visible` integer NOT NULL,
	`idImage` integer,
	FOREIGN KEY (`idImage`) REFERENCES `Image`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Image_id_unique` ON `Image` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `Image_storedName_unique` ON `Image` (`storedName`);--> statement-breakpoint
CREATE UNIQUE INDEX `Product_id_unique` ON `Product` (`id`);