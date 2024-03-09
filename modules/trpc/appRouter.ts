import { z } from 'zod';
import {
  insertImage,
  insertProduct,
  getImages,
  getProducts,
  updateImage,
  updateProduct,
  deleteImage,
  deleteProduct
} from '../db';
import sendMail from '../mail';

import { initTRPC } from '@trpc/server';

const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;

const appRouter = router({
  insertImage: publicProcedure
    .input(
      z.object({
        file: z.instanceof(File),
        descriptiveName: z.string()
      })
    )
    .mutation(
      async (options) =>
        await insertImage({
          file: options.input.file,
          descriptiveName: options.input.descriptiveName
        })
    ),
  insertProduct: publicProcedure
    .input(
      z.object({
        name: z.string(),
        priceNormal: z.number().int().nonnegative(),
        priceOffer: z.union([z.number().int().nonnegative(), z.null()]),
        visible: z.boolean(),
        quantity: z.number().int().nonnegative(),
        id_image: z.union([z.number().int().nonnegative(), z.null()])
      })
    )
    .mutation(async ({ input }) => {
      return await insertProduct({
        name: input.name,
        priceNormal: input.priceNormal,
        priceOffer: input.priceOffer,
        visible: input.visible,
        quantity: input.quantity,
        id_image: input.id_image
      });
    }),
  getImages: publicProcedure.query(async () => {
    return await getImages();
  }),
  getProducts: publicProcedure
    .input(
      z.object({
        filterByName: z.string(),
        includeNoStore: z.boolean(),
        includeNoVisible: z.boolean(),
        minPrice: z.union([z.number().int().nonnegative(), z.null()]),
        maxPrice: z.union([z.number().int().nonnegative(), z.null()])
      })
    )
    .query(async ({ input }) => await getProducts(input)),
  updateImage: publicProcedure
    .input(
      z.object({
        id: z.number(),
        values: z.object({ descriptiveName: z.string() })
      })
    )
    .mutation(async ({ input }) => await updateImage(input.id, input.values)),
  updateProduct: publicProcedure
    .input(
      z.object({
        id: z.number(),
        values: z.object({
          name: z.string().optional(),
          priceNormal: z.number().int().nonnegative().optional(),
          priceOffer: z
            .union([z.number().int().nonnegative(), z.null()])
            .optional(),
          visible: z.boolean().optional(),
          quantity: z.number().int().nonnegative().optional(),
          id_image: z.number().optional()
        })
      })
    )
    .mutation(async ({ input }) => await updateProduct(input.id, input.values)),
  deleteImage: publicProcedure
    .input(
      z.object({
        id: z.number()
      })
    )
    .mutation(async ({ input }) => await deleteImage(input.id)),
  deleteProduct: publicProcedure
    .input(
      z.object({
        id: z.number()
      })
    )
    .mutation(async ({ input }) => await deleteProduct(input.id)),
  sendMail: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => await sendMail(input))
});

export { appRouter };
