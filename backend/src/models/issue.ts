import { PoolClient } from 'pg';
import database from '../database';
import Image, { ImageType } from './image';

type IssueType = {
  id?: number;
  category_id: number;
  reproducibility: string;
  severity: number;
  priority: number;
  summary: string;
  issue_desc: string;
  view_status: boolean;
  issue_status: number;
  created_at?: Date;
  modified_at?: Date;
  deleted_at?: Date;
  user_id: number;
};

class Issue {
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
  async createIssue(
    i: IssueType & { images: ImageType[] }
  ): Promise<IssueType> {
    return this.withConnection(async (connection: PoolClient) => {
      return this.withTransaction(connection, async () => {
        const query = {
          text: `
            INSERT INTO issues
            (category_id, reproducibility, severity, priority, summary, issue_desc, view_status, user_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`,
          values: [
            i.category_id,
            i.reproducibility,
            i.severity,
            i.priority,
            i.summary,
            i.issue_desc,
            i.view_status,
            i.user_id
          ]
        };
        const result = await connection.query(query);
        const { id: issue_id } = result.rows[0];

        // Insert a new image
        const { images } = i;
        const image = new Image();
        for (const img of images) {
          const imageResult = await image.createImage(connection, img);
          const { id: image_id } = imageResult;
          // Link the image with the issue and note in the bridge tables
          await connection.query(
            'INSERT INTO issue_images (issue_id, image_id) VALUES ($1, $2)',
            [issue_id, image_id]
          );
        }
        return result.rows[0];
      });
    });
  }
  async getIssues(): Promise<IssueType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM issues'
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async getIssue(id: string): Promise<IssueType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM issues WHERE id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async updateIssue(id: string, i: IssueType): Promise<IssueType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
            UPDATE issues SET
            category_id=$2, reproducibility=$3, severity=$4, priority=$5,
            summary=$6, issue_desc=$7, view_status=$8, modified_at=$9
            WHERE id=$1 RETURNING *`,
        values: [
          id,
          i.category_id,
          i.reproducibility,
          i.severity,
          i.priority,
          i.summary,
          i.issue_desc,
          i.view_status,
          Date.now()
        ]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async deleteIssue(id: string): Promise<IssueType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'UPDATE issues SET delete_at=$2 WHERE id=$1 RETURNING id',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default Issue;
