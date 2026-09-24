import { Router } from 'express';
import * as notesController from '../controllers/notes.controller';
import { validate } from '../middleware/validate';
import { createNoteSchema, updateNoteSchema } from '../validators/notes.validator';

const router = Router();

router.get('/', notesController.list);
router.get('/:id', notesController.getOne);
router.post('/', validate(createNoteSchema), notesController.create);
router.patch('/:id', validate(updateNoteSchema), notesController.update);
router.delete('/:id', notesController.remove);

export default router;
