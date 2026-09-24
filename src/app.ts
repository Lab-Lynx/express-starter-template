import express from 'express';
import routes from './routes';
import { errorHandler, notFound } from './middleware/error-handler';

// The app is built here and started in server.ts,
// so tests can import it without opening a port.
export const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);
