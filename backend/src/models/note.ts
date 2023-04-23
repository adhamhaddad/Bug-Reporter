import { PoolClient } from 'pg';
import database from '../database';
import Image, { ImageType } from './image';

export type NoteType = {
  id: number;
  note: string;
  issue_id: number;
  created_at?: Date;
  deleted_at?: Date;
};
class Note {
  async withConnection<T>(
    callback: (connection: PoolClient) => Promise<T>
  ): Promise<T> {
    const connection = await database.connect();
    try {
      return await callback(connection);
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async withTransaction<T>(
    connection: PoolClient,
    callback: () => Promise<T>
  ): Promise<T> {
    try {
      await connection.query('BEGIN');
      const result = await callback();
      await connection.query('COMMIT');
      return result;
    } catch (error) {
      await connection.query('ROLLBACK');
      throw error;
    }
  }
  async createNote(n: NoteType & { images: ImageType[] }): Promise<NoteType> {
    return this.withConnection(async (connection: PoolClient) => {
      return this.withTransaction(connection, async () => {
        const query = {
          text: 'INSERT INTO notes (note, issue_id) VALUES ($1, $2) RETURNING *',
          values: [n.note, n.issue_id]
        };
        const result = await connection.query(query);
        const { id: note_id } = result.rows[0];
        // Insert a new image
        const { images } = n;
        const image = new Image();
        for (const img of images) {
          const imageResult = await image.createImage(connection, img);
          const { id: image_id } = imageResult;
          // Link the image with the issue and note in the bridge tables
          await connection.query(
            'INSERT INTO issue_images (note_id, image_id) VALUES ($1, $2)',
            [note_id, image_id]
          );
        }
        return result.rows[0];
      });
    });
  }
  async getNotes(id: string): Promise<NoteType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM notes WHERE issue_id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async getNote(id: string): Promise<NoteType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM notes WHERE id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async updateNote(id: string, n: NoteType): Promise<NoteType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'UPDATE notes SET note=$2 WHERE id=$1 RETURNING *',
        values: [id, n.note]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }

  async deleteNote(id: string): Promise<NoteType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'UPDATE notes SET deleted_at=$2 WHERE id=$1 RETURNING id',
        values: [id, Date.now()]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default Note;
