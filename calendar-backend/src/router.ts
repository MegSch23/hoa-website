// backend/src/router.ts
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import superjson from 'superjson';

const t = initTRPC.create({
  transformer: superjson,
});
  // Transformer is now configured globally
export const appRouter = t.router({

  getEvents: t.procedure.query(() => {
    // Return events; ideally, this would come from a database
    return [
      { id: 1, title: 'Monthly Board Meeting', date: '2025-05-12', location: '259 1/2' },
      { id: 2, title: 'Spring Cleanup', date: '2025-06-10', location: 'Community Garden' },
      { id: 3, title: 'Monthly Board Meeting', date: '2025-07-21', location: 'Clubhouse' },
      { id: 4, title: 'Annual HOA Meeting', date: '2025-06-16', location: 'J\'s White Elephant' },
    ];
  }),

  addEvent: t.procedure
    .input(z.object({ title: z.string(), date: z.string(), location: z.string() }))
    .mutation(({ input }) => {
      // Add event logic, would be connected to DB in production
      return { success: true, event: input };
    }),

  removeEvent: t.procedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => {
      // Remove event logic, would be connected to DB in production
      return { success: true, removedId: input.id };
    }),
});

export type AppRouter = typeof appRouter;
