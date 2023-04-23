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

const router = Router();

router
  .post('/', validateCreateProfilePicture, createProfilePicture)
  .get('/:id', validateGetProfilePicture, getProfilePicture)
  .delete('/:id', validateDeleteProfilePicture, deleteProfilePicture);

export default router;
