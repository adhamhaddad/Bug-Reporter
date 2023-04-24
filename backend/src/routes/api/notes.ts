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
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router
  .post('/', validateCreateNote, verifyToken, createNote)
  .get('/all/:id', validateGetNotes, verifyToken, getNotes)
  .get('/:id', validateGetNote, verifyToken, getNote)
  .patch('/:id', validateUpdateNote, verifyToken, updateNote)
  .delete('/:id', validateDeleteNote, verifyToken, deleteNote);

export default router;
