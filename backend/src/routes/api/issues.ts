import { Router } from 'express';
import {
  validateCreateIssue,
  validateGetIssues,
  validateGetIssue,
  validateUpdateIssue,
  validateDeleteIssue
} from '../../middlewares/validation/issues';
import {
  createIssue,
  getIssues,
  getIssue,
  updateIssue,
  deleteIssue
} from '../../controllers/issues';

const router = Router();

router
  .post('/', validateCreateIssue, createIssue)
  .get('/', validateGetIssues, getIssues)
  .get('/:id', validateGetIssue, getIssue)
  .patch('/:id', validateUpdateIssue, updateIssue)
  .delete('/:id', validateDeleteIssue, deleteIssue);

export default router;
