import { Router } from 'express';
import {
  auth,
  users,
  emails,
  phones,
  profilePictures,
  categories,
  issues,
  notes
} from './api';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/emails', emails);
router.use('/phones', phones);
router.use('/profile-pictures', profilePictures);
router.use('/categories', categories);
router.use('/issues', issues);
router.use('/notes', notes);

export default router;
