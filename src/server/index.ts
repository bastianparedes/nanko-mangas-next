import { router, publicProcedure } from './trpc';
import { z } from 'zod';
import {
  insertImage,
  insertProduct,
  getImages,
  getProducts,
  updateImage,
  updateProduct
} from '../../modules/db';

const appRouter = router({
  insertImage: publicProcedure
    .input(
      z.object({
        file: z.instanceof(File),
        descriptiveName: z.string()
      })
    )
    .mutation(async (options) => {
      return await insertImage({
        file: options.input.file,
        descriptiveName: options.input.descriptiveName
      });
    }),
  insertProduct: publicProcedure
    .input(
      z.object({
        name: z.string(),
        priceNormal: z.number().int().nonnegative(),
        priceOffer: z.union([z.number().int().nonnegative(), z.null()]),
        visible: z.boolean(),
        quantity: z.number().int().nonnegative(),
        id_image: z.number()
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
  getImages: publicProcedure.query(async () => await getImages()),
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
    .mutation(async ({ input }) => {
      try {
        await updateImage(input.id, input.values);
      } catch {
        return {
          success: false
        };
      }
      return {
        success: true
      };
    }),
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
    .mutation(async ({ input }) => {
      try {
        await updateProduct(input.id, input.values);
      } catch {
        return {
          success: false
        };
      }
      return {
        success: true
      };
    })
});

export { appRouter };
export type AppRouter = typeof appRouter;
