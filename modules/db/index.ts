import { and, eq, gt, gte, ilike, lte, or } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import fileSystem from '../fileSystem';
import path from 'path';
import sharp from 'sharp';

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

      await db.insert(schema.Image).values({
        descriptiveName: values.descriptiveName,
        storedName: name,
        url: url.toString()
      });
    } catch (_error) {
      // console.log('ERROR AL SUBIR ARCHIVO', _error);
      tx.rollback();

      return {
        success: false
      };
    }

    return {
      success: true
    };
  });
};

const insertProduct = async (values: {
  name: string;
  priceNormal: number;
  priceOffer: number | null;
  visible: boolean;
  quantity: number;
  id_image: number | null;
}) => {
  try {
    const data = await db.insert(schema.Product).values(values).returning();
    return {
      data,
      success: true
    };
  } catch {
    return {
      data: null,
      success: false
    };
  }
};

const getImages = async () => await db.query.Image.findMany();

const getProducts = async ({
  filterByName = '',
  includeNoStore = false,
  includeNoVisible = true,
  minPrice = -Infinity,
  maxPrice = Infinity
}: {
  filterByName: string;
  includeNoStore: boolean;
  includeNoVisible: boolean;
  minPrice: number | null;
  maxPrice: number | null;
}) =>
  await db.query.Product.findMany({
    where: and(
      !includeNoVisible ? eq(schema.Product.visible, true) : undefined,
      !includeNoStore ? gt(schema.Product.quantity, 0) : undefined,
      ilike(
        schema.Product.name,
        '%' + filterByName.trim().split('').join('%') + '%'
      ),
      minPrice !== null
        ? or(
            gte(schema.Product.priceNormal, minPrice),
            gte(schema.Product.priceOffer, minPrice)
          )
        : undefined,
      maxPrice !== null
        ? or(
            lte(schema.Product.priceNormal, maxPrice),
            lte(schema.Product.priceOffer, maxPrice)
          )
        : undefined
    ),
    with: {
      image: {
        columns: {
          url: true
        }
      }
    }
  });

const updateImage = async (
  id: number,
  values: { descriptiveName?: string }
) => {
  try {
    const data = await db
      .update(schema.Image)
      .set(values)
      .where(eq(schema.Image.id, id))
      .returning();
    return {
      data,
      success: true
    };
  } catch {
    return { data: null, success: false };
  }
};

const updateProduct = async (
  id: number,
  values: {
    name?: string;
    priceNormal?: number;
    priceOffer?: number | null;
    visible?: boolean;
    quantity?: number;
    id_image?: number;
  }
) => {
  try {
    const data = await db
      .update(schema.Product)
      .set(values)
      .where(eq(schema.Product.id, id))
      .returning();
    return { data, success: true };
  } catch {
    return { data: null, success: false };
  }
};

const deleteImage = async (id: number) => {
  try {
    const data = await db
      .delete(schema.Image)
      .where(eq(schema.Image.id, id))
      .returning();
    return { data, success: true };
  } catch {
    return { data: null, success: false };
  }
};

const deleteProduct = async (id: number) => {
  try {
    const data = await db
      .delete(schema.Product)
      .where(eq(schema.Product.id, id))
      .returning();
    return {
      data,
      success: true
    };
  } catch {
    return { data: null, success: false };
  }
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
