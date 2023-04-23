import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreateCategory = [
  body('name')
    .exists()
    .withMessage('name is missing from the body')
    .notEmpty()
    .withMessage('name is empty')
    .isString()
    .withMessage('name must be a string'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
