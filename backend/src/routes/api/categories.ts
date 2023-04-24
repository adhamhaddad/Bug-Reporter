import { Router } from 'express';
import {
  validateCreateCategory,
  validateGetCategories,
  validateUpdateCategory,
  validateDeleteCategory
} from '../../middlewares/validation/categories';
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} from '../../controllers/categories';
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router
  .post('/', validateCreateCategory, verifyToken, createCategory)
  .get('/:id', validateGetCategories, verifyToken, getCategories)
  .patch('/:id', validateUpdateCategory, verifyToken, updateCategory)
  .delete('/:id', validateDeleteCategory, verifyToken, deleteCategory);

export default router;
