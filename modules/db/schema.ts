import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  serial,
  varchar,
  boolean
} from 'drizzle-orm/pg-core';

export const Image = pgTable('Image', {
  id: serial('id').notNull().unique().primaryKey(),
  descriptiveName: varchar('descriptiveName').notNull().unique(),
  storedName: varchar('storedName').notNull().unique(),
  url: varchar('url').notNull()
});

export const Product = pgTable('Product', {
  id: serial('id').notNull().unique().primaryKey(),
  name: varchar('name').notNull().unique(),
  priceNormal: integer('priceNormal').notNull(),
  priceOffer: integer('priceOffer'),
  visible: boolean('visible').notNull(),
  quantity: integer('quantity'),
  id_image: integer('id_image')
    .notNull()
    .references(() => Image.id)
});

export const RatingRelations = relations(Product, ({ one }) => ({
  user: one(Image, {
    fields: [Product.id_image],
    references: [Image.id]
  })
}));
