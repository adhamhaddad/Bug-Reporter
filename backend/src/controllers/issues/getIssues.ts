import { Request, Response } from 'express';
import Issue from '../../models/issue';

const issue = new Issue();

export const getIssues = async (req: Request, res: Response) => {
  try {
    const response = await issue.getIssues();
    res.status(200).json({
      status: true,
      data: response,
      message: 'Issues fetched successfully.'
    });
  } catch (error) {
    res.status(400).json({
      error: (error as Error).message
    });
  }
};
