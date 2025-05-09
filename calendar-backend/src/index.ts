import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './router';

const app = express();

// 👇 Enable CORS for your frontend
app.use(cors({
  origin: 'http://localhost:4200', // or '*' for all origins (use only in dev) TODO: will need to add frontend URL here
  methods: ['GET', 'POST'],
  credentials: true,
}));

// Middleware to handle tRPC
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  }),
);

app.listen(4000, () => {
  console.log('tRPC backend running on http://localhost:4000');
});
