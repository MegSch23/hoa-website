import { of } from 'rxjs';
import type { AppRouter } from '../../../calendar-backend/src/router'; // Adjust path to your backend's router
import { createTRPCClient } from '@trpc/client';
import superjson from 'superjson';

import { httpBatchLink } from '@trpc/client';

export const trpc = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
          url: 'http://localhost:4000/trpc',
          transformer: superjson
        }),
    ],
});
  
  // You can now use this trpc client to interact with your backend
  trpc.getEvents.query().then(events => {
    console.log(events); // Display events
    return of(events)
  });
