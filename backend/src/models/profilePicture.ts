import { PoolClient } from 'pg';
import database from '../database';

export type ProfilePictureType = {
  id?: number;
  profile_url: string;
  user_id: number;
};

class ProfilePicture {
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
  async createProfilePicture(
    p: ProfilePictureType
  ): Promise<ProfilePictureType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'INSERT INTO profile_pictures (profile_url, user_id) VALUES ($1, $2) RETURNING *',
        values: [p.profile_url, p.user_id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async getProfilePicture(id: string): Promise<ProfilePictureType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FORM profile_pictures WHERE user_id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async deleteProfilePicture(id: string): Promise<ProfilePictureType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'DELETE FROM profile_pictures WHERE id=$1 RETURNING *',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default ProfilePicture;
