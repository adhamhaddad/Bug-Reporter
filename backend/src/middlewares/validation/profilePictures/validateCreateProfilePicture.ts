import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreateProfilePicture = [
  body('profile_url')
    .exists()
    .withMessage("profile_url doesn't exists in the body.")
    .notEmpty()
    .withMessage('profile_url is empty')
    .isString()
    .withMessage('profile_url must be a string'),
  body('user_id')
    .exists()
    .withMessage('user_id is missing from the body')
    .notEmpty()
    .withMessage('user_id is empty')
    .isNumeric()
    .withMessage('user_id must be number'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
