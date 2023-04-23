import { Request, Response } from 'express';
import Issue from '../../models/issue';

const issue = new Issue();

export const updateIssue = async (req: Request, res: Response) => {
  try {
    const response = await issue.updateIssue(req.params.id, req.body);
    res.status(203).json({
      status: true,
      data: response,
      message: 'Issue updated successfully.'
    });
  } catch (error) {
    res.status(400).json({
      error: (error as Error).message
    });
  }
};
