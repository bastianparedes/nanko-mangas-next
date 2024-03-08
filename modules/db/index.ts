import { eq } from 'drizzle-orm';
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
  const descriptiveNameIsFree =
    (await db.query.Image.findFirst({
      where: eq(schema.Image.descriptiveName, descriptiveName)
    })) === undefined;

  if (!descriptiveNameIsFree)
    return {
      success: false
    };

  return await db.transaction(async (tx) => {
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
          path: fullName,
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

    return {
      success: true
    };
  });
};

const insertProduct = async (values: {
  name: string;
  priceNormal: number;
  priceOffer: number | null | undefined;
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

const updateProduct = async (
  id: number,
  values: {
    id: number;
    name: string;
    priceNormal: number;
    priceOffer: number | null | undefined;
    visible: boolean;
    quantity: number;
    id_image: number;
  }
) => {
  await db
    .update(schema.Product)
    .set({
      quantity: 0
    })
    .where(eq(schema.Product.id, values.id));
};

export { insertImage, insertProduct, updateProduct };
export default db;
