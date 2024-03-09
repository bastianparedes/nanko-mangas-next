import { httpBatchLink } from '@trpc/client';
import { appRouter } from '@/server';

const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/api/trpc'
    })
  ]
});

export { serverClient };
