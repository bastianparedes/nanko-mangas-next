import { router, publicProcedure } from './trpc';
import { z } from 'zod';
import { insertImage, getImages, getProducts } from '../../modules/db';

const a = z.string();

const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    return [10, 20, 30];
  }),
  getHola: publicProcedure.input(z.object({})).mutation(async (options) => {
    console.log(options.input);
    return true;
  }),
  insertImage: publicProcedure
    .input(
      z.object({
        file: z.instanceof(File),
        descriptiveName: z.string()
      })
    )
    .mutation(async (options) => {
      console.log(options.input);
      return await insertImage({
        file: options.input.file,
        descriptiveName: options.input.descriptiveName
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
    .query(async ({ input }) => await getProducts(input))
});

export { appRouter };
export type AppRouter = typeof appRouter;
