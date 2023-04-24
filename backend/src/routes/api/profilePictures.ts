import { Router } from 'express';
import {
  validateCreateProfilePicture,
  validateGetProfilePicture,
  validateDeleteProfilePicture
} from '../../middlewares/validation/profilePictures';
import {
  createProfilePicture,
  getProfilePicture,
  deleteProfilePicture
} from '../../controllers/profilePictures';
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router
  .post('/', validateCreateProfilePicture, verifyToken, createProfilePicture)
  .get('/:id', validateGetProfilePicture, verifyToken, getProfilePicture)
  .delete(
    '/:id',
    validateDeleteProfilePicture,
    verifyToken,
    deleteProfilePicture
  );

export default router;
