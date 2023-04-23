import { Request, Response } from 'express';
import Note from '../../models/note';

const note = new Note();

export const createNote = async (req: Request, res: Response) => {
  try {
    const response = await note.createNote(req.body);
    res.status(201).json({
      status: true,
      data: response,
      message: 'Note created successfully.'
    });
  } catch (error) {
    res.status(400).json({
      error: (error as Error).message
    });
  }
};
