import { RequestHandler } from 'express';
import { ZodTypeAny } from 'zod';
import { HttpError } from '../utils/http-error';

// Validates req.body against a zod schema. On failure it responds with a 400.
export const validate =
  (schema: ZodTypeAny): RequestHandler =>
  (req, _res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message = result.error.issues.map((issue) => issue.message).join('; ');
      return next(new HttpError(400, message));
    }
    req.body = result.data;
    next();
  };
