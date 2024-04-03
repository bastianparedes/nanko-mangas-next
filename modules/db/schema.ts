import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const Image = sqliteTable('Image', {
  id: integer('id', { mode: 'number' })
    .unique()
    .notNull()
    .primaryKey({ autoIncrement: true }),
  descriptiveName: text('descriptiveName').notNull(),
  storedName: text('storedName').notNull().unique(),
  url: text('url').notNull()
});

export const Product = sqliteTable('Product', {
  id: integer('id', { mode: 'number' })
    .unique()
    .notNull()
    .primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  priceNormal: integer('priceNormal').notNull(),
  priceOffer: integer('priceOffer'),
  visible: integer('visible', { mode: 'boolean' }).notNull(),
  idImage: integer('idImage').references(() => Image.id)
});

export const ProductRelations = relations(Product, ({ one }) => ({
  image: one(Image, {
    fields: [Product.idImage],
    references: [Image.id]
  })
}));

export const ImageRelations = relations(Image, ({ many }) => ({
  products: many(Product)
}));
