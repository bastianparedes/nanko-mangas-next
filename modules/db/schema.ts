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
  descriptiveName: varchar('descriptiveName').notNull(),
  storedName: varchar('storedName').notNull().unique(),
  url: varchar('url').notNull()
});

export const Product = pgTable('Product', {
  id: serial('id').notNull().unique().primaryKey(),
  name: varchar('name').notNull(),
  priceNormal: integer('priceNormal').notNull(),
  priceOffer: integer('priceOffer'),
  visible: boolean('visible').notNull(),
  quantity: integer('quantity').notNull(),
  id_image: integer('id_image').references(() => Image.id)
});

export const ProductRelations = relations(Product, ({ one }) => ({
  image: one(Image, {
    fields: [Product.id_image],
    references: [Image.id]
  })
}));

export const ImageRelations = relations(Image, ({ many }) => ({
  products: many(Product)
}));
