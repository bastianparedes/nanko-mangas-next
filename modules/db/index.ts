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

const insertImage = async ({
  descriptiveName,
  file
}: {
  descriptiveName: string;
  file: File;
}) => {
  try {
    await db.transaction(async (tx) => {
      try {
        const uuid = crypto.randomUUID();
        const name = uuid + '.webp';

        const arrayBuffer = await file.arrayBuffer();

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
          descriptiveName: descriptiveName,
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
    });
  } catch {
    return { success: false };
  }

  return {
    success: true
  };
};

const insertProduct = async (values: {
  name: string;
  priceNormal: number;
  priceOffer: number | null;
  visible: boolean;
  quantity: number;
  id_image: number;
}) => {
  try {
    await db.insert(schema.Product).values(values);
  } catch {
    return {
      success: false
    };
  }

  return {
    success: true
  };
};

const getImages = async () => {
  const images = await db.query.Image.findMany();

  return images;
};

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
}) => {
  const { Product } = schema;
  const response = await db.query.Product.findMany({
    where: and(
      !includeNoVisible ? eq(Product.visible, true) : undefined,
      !includeNoStore ? gt(Product.quantity, 0) : undefined,
      ilike(Product.name, '%' + filterByName.trim().split('').join('%') + '%'),
      minPrice !== null
        ? or(
            gte(Product.priceNormal, minPrice),
            gte(Product.priceOffer, minPrice)
          )
        : undefined,
      maxPrice !== null
        ? or(
            lte(Product.priceNormal, maxPrice),
            lte(Product.priceOffer, maxPrice)
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

  return response;
};

const updateImage = async (
  id: number,
  values: { descriptiveName?: string }
) => {
  try {
    await db.update(schema.Image).set(values).where(eq(schema.Image.id, id));
  } catch {
    return { success: false };
  }
  return { success: true };
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
    await db
      .update(schema.Product)
      .set(values)
      .where(eq(schema.Product.id, id));
  } catch {
    return { success: false };
  }
  return { success: true };
};

export {
  insertImage,
  insertProduct,
  getImages,
  getProducts,
  updateImage,
  updateProduct
};
export default db;
