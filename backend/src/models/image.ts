import { PoolClient } from 'pg';

export type ImageType = {
  id: number;
  image_url: string;
};

class Image {
  async createImage(connection: PoolClient, i: ImageType) {
    const query = {
      text: 'INSERT INTO images (image_url) VALUES ($1) RETURNING id',
      values: [i.image_url]
    };
    const result = await connection.query(query);
    return result.rows[0];
  }
}
export default Image;
