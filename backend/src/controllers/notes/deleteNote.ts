import { Request, Response } from 'express';
import Note from '../../models/note';

const note = new Note();

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const response = await note.deleteNote(req.params.id);
    res.status(200).json({
      status: true,
      data: response,
      message: 'Note deleted successfully.'
    });
  } catch (error) {
    res.status(400).json({
      error: (error as Error).message
    });
  }
};
