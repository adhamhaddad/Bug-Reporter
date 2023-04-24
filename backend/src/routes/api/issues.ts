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
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router
  .post('/', validateCreateIssue, verifyToken, createIssue)
  .get('/', validateGetIssues, verifyToken, getIssues)
  .get('/:id', validateGetIssue, verifyToken, getIssue)
  .patch('/:id', validateUpdateIssue, verifyToken, updateIssue)
  .delete('/:id', validateDeleteIssue, verifyToken, deleteIssue);

export default router;
