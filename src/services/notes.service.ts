import { randomUUID } from 'crypto';
import { HttpError } from '../utils/http-error';
import type { CreateNoteInput, UpdateNoteInput } from '../validators/notes.validator';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// Notes live in memory. They reset whenever the server restarts.
const notes = new Map<string, Note>();

export function listNotes(): Note[] {
  return Array.from(notes.values());
}

export function getNote(id: string): Note {
  const note = notes.get(id);
  if (!note) {
    throw new HttpError(404, 'Note not found');
  }
  return note;
}

export function createNote(input: CreateNoteInput): Note {
  const now = new Date().toISOString();
  const note: Note = {
    id: randomUUID(),
    title: input.title,
    content: input.content ?? '',
    createdAt: now,
    updatedAt: now,
  };
  notes.set(note.id, note);
  return note;
}

export function updateNote(id: string, input: UpdateNoteInput): Note {
  const existing = getNote(id);
  const updated: Note = {
    ...existing,
    title: input.title ?? existing.title,
    content: input.content ?? existing.content,
    updatedAt: new Date().toISOString(),
  };
  notes.set(id, updated);
  return updated;
}

export function deleteNote(id: string): void {
  getNote(id); // throws 404 if it does not exist
  notes.delete(id);
}

// Used by tests to start each test with an empty list.
export function resetNotes(): void {
  notes.clear();
}
