import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreateIssue = [
  body('category_id')
    .exists()
    .withMessage('category_id is missing from the body')
    .notEmpty()
    .withMessage('category_id is empty')
    .isNumeric()
    .withMessage('category_id must be number'),
  body('reproducibility')
    .exists()
    .withMessage('reproducibility is missing from the body')
    .notEmpty()
    .withMessage('reproducibility is empty')
    .isString()
    .withMessage('reproducibility must be a string'),
  body('severity')
    .exists()
    .withMessage('severity is missing from the body')
    .notEmpty()
    .withMessage('severity is empty')
    .isNumeric()
    .withMessage('severity must be number'),
  body('priority')
    .exists()
    .withMessage('priority is missing from the body')
    .notEmpty()
    .withMessage('priority is empty')
    .isNumeric()
    .withMessage('priority must be number'),
  body('summary')
    .exists()
    .withMessage('summary is missing from the body')
    .notEmpty()
    .withMessage('summary is empty')
    .isString()
    .withMessage('summary must be a string'),
  body('issue_desc')
    .exists()
    .withMessage('issue_desc is missing from the body')
    .notEmpty()
    .withMessage('issue_desc is empty')
    .isString()
    .withMessage('issue_desc must be a string'),
  body('view_status')
    .exists()
    .withMessage('view_status is missing from the body')
    .notEmpty()
    .withMessage('view_status is empty')
    .isBoolean()
    .withMessage('view_status must be boolean'),
  body('user_id')
    .exists()
    .withMessage('user_id is missing from the body')
    .notEmpty()
    .withMessage('user_id is empty')
    .isNumeric()
    .withMessage('user_id must be number'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
