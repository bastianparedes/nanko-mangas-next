import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import fileSystem from '../fileSystem';
import path from 'path';

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

      await fileSystem.filesUpload({
        path: path.join('/images', uuid),
        contents: file
      });

      const sharedLink = (
        await fileSystem.sharingCreateSharedLinkWithSettings({
          path: path.join('/images', uuid)
        })
      ).result.url;

      await db.insert(schema.Image).values({
        descriptiveName: descriptiveName,
        storedName: uuid,
        url: sharedLink
      });
    } catch (_error) {
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
