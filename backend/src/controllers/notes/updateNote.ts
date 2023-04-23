import { Request, Response } from 'express';
import Note from '../../models/note';

const note = new Note();

export const updateNote = async (req: Request, res: Response) => {
  try {
    const response = await note.updateNote(req.params.id, req.body);
    res.status(203).json({
      status: true,
      data: response,
      message: 'Note updated successfully.'
    });
  } catch (error) {
    res.status(400).json({
      error: (error as Error).message
    });
  }
};
