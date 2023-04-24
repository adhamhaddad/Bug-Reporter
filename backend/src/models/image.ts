import { PoolClient } from 'pg';

export type ImageType = {
  id: number;
  image_url: string;
};
export const createImage = async (connection: PoolClient, i: ImageType) => {
  const query = {
    text: 'INSERT INTO images (image_url) VALUES ($1) RETURNING id',
    values: [i.image_url]
  };
  const result = await connection.query(query);
  return result.rows[0];
};
