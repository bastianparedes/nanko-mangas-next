'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React, { useState } from 'react';
import { trpcClient } from '../../../modules/trpc/client';

interface Props {
  children: React.ReactNode;
}

const Provider = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient({}));
  const [client] = useState(() =>
    trpcClient.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/api/trpc'
        })
      ]
    })
  );

  return (
    <trpcClient.Provider client={client} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpcClient.Provider>
  );
};

export { Provider };
