import { Request, Response, NextFunction } from 'express';
import { body, oneOf } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreateNote = [
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
  body('user_id')
    .exists()
    .withMessage('user_id is missing from the body')
    .notEmpty()
    .withMessage('user_id is empty')
    .isNumeric()
    .withMessage('user_id must be number'),
  body('issue_id')
    .exists()
    .withMessage('issue_id is missing from the body')
    .notEmpty()
    .withMessage('issue_id is empty')
    .isNumeric()
    .withMessage('issue_id must be number'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
