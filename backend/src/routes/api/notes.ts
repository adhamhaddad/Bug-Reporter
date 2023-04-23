import { Router } from 'express';
import {
  validateCreateNote,
  validateGetNotes,
  validateGetNote,
  validateUpdateNote,
  validateDeleteNote
} from '../../middlewares/validation/notes';
import {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote
} from '../../controllers/notes';

const router = Router();

router
  .post('/', validateCreateNote, createNote)
  .get('/all/:id', validateGetNotes, getNotes)
  .get('/:id', validateGetNote, getNote)
  .patch('/:id', validateUpdateNote, updateNote)
  .delete('/:id', validateDeleteNote, deleteNote);

export default router;
