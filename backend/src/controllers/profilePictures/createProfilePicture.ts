import { Request, Response } from 'express';
import ProfilePicture from '../../models/profilePicture';

const profile = new ProfilePicture();

export const createProfilePicture = async (req: Request, res: Response) => {
  try {
    const response = await profile.createProfilePicture(req.body);
    res.status(201).json({
      status: true,
      data: response,
      message: 'Profile picture created successfully.'
    });
  } catch (error) {
    res.status(400).json({
      error: (error as Error).message
    });
  }
};
