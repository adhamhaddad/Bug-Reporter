import { Request, Response } from 'express';
import Issue from '../../models/issue';

const issue = new Issue();

export const createIssue = async (req: Request, res: Response) => {
  try {
    const response = await issue.createIssue(req.body);
    res.status(201).json({
      status: true,
      data: response,
      message: 'Issue created successfully.'
    });
  } catch (error) {
    res.status(400).json({
      error: (error as Error).message
    });
  }
};
