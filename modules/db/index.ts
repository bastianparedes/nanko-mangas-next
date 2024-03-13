import { and, eq, gt, gte, ilike, lte, or } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import fileSystem from '../fileSystem';
import path from 'path';
import sharp from 'sharp';
import { filterObject } from '../../src/utils/object';
import * as schema from './schema';

const client = new Client({
  connectionString: process.env.DATABASE_URL
});
client.connect();
const db = drizzle(client, { schema });

const insertImage = async (values: { descriptiveName: string; file: File }) => {
  return await db.transaction(async (tx) => {
    try {
      const uuid = crypto.randomUUID();
      const name = uuid + '.webp';

      const arrayBuffer = await values.file.arrayBuffer();

      const buffer = await sharp(arrayBuffer)
        .resize(200, 323, {
          fit: 'cover'
        })
        .webp({ lossless: false })
        .toBuffer();

      const fullName = path.join('/images', name).replaceAll('\\', '/');

      await fileSystem.filesUpload({
        path: fullName,
        contents: buffer
      });

      const sharedLink = (
        await fileSystem.sharingCreateSharedLinkWithSettings({
          path: fullName
        })
      ).result.url;
      const url = new URL(sharedLink);
      url.hostname = url.hostname.replace(/^www\./, 'dl.');

      return (
        await db
          .insert(schema.Image)
          .values({
            descriptiveName: values.descriptiveName,
            storedName: name,
            url: url.toString()
          })
          .returning()
      )[0];
    } catch (_error) {
      // console.log('ERROR AL SUBIR ARCHIVO', _error);
      tx.rollback();
    }
  });
};

const insertProduct = async (values: {
  name: string;
  priceNormal: number;
  priceOffer: number | null;
  visible: boolean;
  quantity: number;
  idImage: number | null;
}) => {
  const data = await db.insert(schema.Product).values(values).returning();
  return data[0];
};

const getImages = async (
  columns: (keyof typeof schema.Image.$inferSelect)[]
) => {
  const schemaColumns = {
    id: schema.Image.id,
    descriptiveName: schema.Image.descriptiveName,
    storedName: schema.Image.storedName,
    url: schema.Image.url
  };

  const selectedColumns = filterObject(schemaColumns, columns);
  return await db.select(selectedColumns).from(schema.Image);
};

const getProducts = async (
  columns: (keyof typeof schema.Product._.columns | 'urlImage')[],
  config: {
    filterByName: string;
    includeNoStore: boolean;
    includeNoVisible: boolean;
    minPrice: number | null;
    maxPrice: number | null;
  } = {
    filterByName: '',
    includeNoStore: false,
    includeNoVisible: true,
    minPrice: -Infinity,
    maxPrice: Infinity
  }
) => {
  const schemaColumns = {
    id: schema.Product.id,
    name: schema.Product.name,
    priceNormal: schema.Product.priceNormal,
    priceOffer: schema.Product.priceOffer,
    visible: schema.Product.visible,
    quantity: schema.Product.quantity,
    idImage: schema.Product.idImage,
    urlImage: schema.Image.url
  };

  const selectedColumns = filterObject(schemaColumns, columns);

  return await db
    .select(selectedColumns)
    .from(schema.Product)
    .where(
      and(
        !config.includeNoVisible ? eq(schema.Product.visible, true) : undefined,
        !config.includeNoStore ? gt(schema.Product.quantity, 0) : undefined,
        ilike(
          schema.Product.name,
          '%' + config.filterByName.trim().split('').join('%') + '%'
        ),
        config.minPrice !== null
          ? or(
              gte(schema.Product.priceNormal, config.minPrice),
              gte(schema.Product.priceOffer, config.minPrice)
            )
          : undefined,
        config.maxPrice !== null
          ? or(
              lte(schema.Product.priceNormal, config.maxPrice),
              lte(schema.Product.priceOffer, config.maxPrice)
            )
          : undefined
      )
    )
    .leftJoin(schema.Image, eq(schema.Product.idImage, schema.Image.id));
};

type a = Parameters<typeof getProducts>[0];

const updateImage = async (
  id: number,
  values: { descriptiveName?: string }
) => {
  return await db
    .update(schema.Image)
    .set(values)
    .where(eq(schema.Image.id, id))
    .returning();
};

const updateProduct = async (
  id: number,
  values: {
    name?: string;
    priceNormal?: number;
    priceOffer?: number | null;
    visible?: boolean;
    quantity?: number;
    idImage?: number;
  }
) => {
  return await db
    .update(schema.Product)
    .set(values)
    .where(eq(schema.Product.id, id))
    .returning();
};

const deleteImage = async (id: number) => {
  return await db
    .delete(schema.Image)
    .where(eq(schema.Image.id, id))
    .returning();
};

const deleteProduct = async (id: number) => {
  return await db
    .delete(schema.Product)
    .where(eq(schema.Product.id, id))
    .returning();
};

export {
  insertImage,
  insertProduct,
  getImages,
  getProducts,
  updateImage,
  updateProduct,
  deleteImage,
  deleteProduct
};
export default db;
