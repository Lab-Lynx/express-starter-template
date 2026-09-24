import { Request, Response } from 'express';
import * as notesService from '../services/notes.service';
import type { CreateNoteInput, UpdateNoteInput } from '../validators/notes.validator';

export function list(_req: Request, res: Response): void {
  res.json(notesService.listNotes());
}

export function getOne(req: Request, res: Response): void {
  res.json(notesService.getNote(req.params.id));
}

export function create(req: Request, res: Response): void {
  const note = notesService.createNote(req.body as CreateNoteInput);
  res.status(201).json(note);
}

export function update(req: Request, res: Response): void {
  res.json(notesService.updateNote(req.params.id, req.body as UpdateNoteInput));
}

export function remove(req: Request, res: Response): void {
  notesService.deleteNote(req.params.id);
  res.status(204).send();
}
