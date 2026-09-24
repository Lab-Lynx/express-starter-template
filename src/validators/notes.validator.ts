import { z } from 'zod';

const title = z
  .string({ required_error: 'title is required', invalid_type_error: 'title must be a string' })
  .trim()
  .min(1, 'title is required')
  .max(100, 'title must be at most 100 characters');

const content = z
  .string({ invalid_type_error: 'content must be a string' })
  .max(1000, 'content must be at most 1000 characters');

export const createNoteSchema = z.object({
  title,
  content: content.optional(),
});

export const updateNoteSchema = z
  .object({
    title: title.optional(),
    content: content.optional(),
  })
  .refine((data) => data.title !== undefined || data.content !== undefined, {
    message: 'Provide at least one field to update',
  });

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
