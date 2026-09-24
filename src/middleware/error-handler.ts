import { ErrorRequestHandler, NextFunction, Request, RequestHandler, Response } from 'express';
import { HttpError } from '../utils/http-error';

export const notFound: RequestHandler = (_req, _res, next) => {
  next(new HttpError(404, 'Route not found'));
};

// Express recognises an error handler by its 4 arguments, so keep all four.
export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message });
    return;
  }

  // Malformed JSON in the request body (thrown by express.json)
  if (err instanceof SyntaxError && (err as { status?: number }).status === 400) {
    res.status(400).json({ error: 'Invalid JSON body' });
    return;
  }

  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
};
