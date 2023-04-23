import { Request, Response } from 'express';
import Issue from '../../models/issue';

const issue = new Issue();

export const deleteIssue = async (req: Request, res: Response) => {
  try {
    const response = await issue.deleteIssue(req.params.id);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Issue deleted successfully.'
    });
  } catch (error) {
    res.status(400).json({
      error: (error as Error).message
    });
  }
};
