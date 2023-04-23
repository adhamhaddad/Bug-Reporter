import { Request, Response, NextFunction } from 'express';
import { check, body, oneOf } from 'express-validator';
import { validate } from '../validationResult';

export const validateUpdateNote = [
  check('id')
    .exists()
    .withMessage('id is missing from the parameters')
    .notEmpty()
    .withMessage('id is empty'),
  oneOf([
    body('note')
      .exists()
      .withMessage('note is missing from the body')
      .notEmpty()
      .withMessage('note is empty')
      .isString()
      .withMessage('note must be a string'),
    body('image_url')
      .exists()
      .withMessage('image_url is missing from the body')
      .notEmpty()
      .withMessage('image_url is empty')
      .isString()
      .withMessage('image_url must be a string')
  ]),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
