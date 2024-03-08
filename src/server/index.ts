import { router, publicProcedure } from './trpc';
import { z } from 'zod';

const a = z.string();

const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    return [10, 20, 30];
  }),
  getHola: publicProcedure.input(z.string()).mutation(async (options) => {
    console.log(options.input);
    return true;
  })
});

export { appRouter };
export type AppRouter = typeof appRouter;
