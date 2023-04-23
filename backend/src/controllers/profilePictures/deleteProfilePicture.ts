import { Request, Response } from 'express';
import ProfilePicture from '../../models/profilePicture';

const profile = new ProfilePicture();

export const deleteProfilePicture = async (req: Request, res: Response) => {
  try {
    const response = await profile.deleteProfilePicture(req.params.id);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Profile picture deleted successfully.'
    });
  } catch (error) {
    res.status(400).json({
      error: (error as Error).message
    });
  }
};
