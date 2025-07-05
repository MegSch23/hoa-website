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
      { id: 1, title: 'Monthly Board Meeting', date: '2025-07-21 18:00', location: '259 1/2', description: 'Discuss community issues and updates' },
      { id: 2, title: 'Spring Cleanup', date: '2025-07-12 12:00', location: 'Community Garden', description: 'Community cleanup event' },
      { id: 3, title: 'Monthly Board Meeting', date: '2025-08-18 18:00', location: '259 1/2', description: 'Discuss community issues and updates' },   
      { id: 4, title: 'Monthly Board Meeting', date: '2025-09-15 18:00', location: '259 1/2', description: 'Discuss community issues and updates' },  
      { id: 5, title: 'Monthly Board Meeting', date: '2025-10-20 18:00', location: '259 1/2', description: 'Discuss community issues and updates' },  

    ];
  }),

  addEvent: t.procedure
    .input(z.object({ title: z.string(), date: z.string(), location: z.string(), description: z.string().optional() }))
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
