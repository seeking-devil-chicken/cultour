import { Request, Response, NextFunction } from 'express';
import database from '../models/database.js';

export default {
  postData: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { country, category, title, text, image } = req.body;
      const user_id = 1; // HARDCODED THIS VALUE

      const result = await database.query(
        'INSERT INTO posts (user_id, country, category, title, text, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [user_id, country, category, title, text, image] // Include user_id here
      );

      res.locals.newPost = result.rows[0];
      return next();
    } catch (err) {
      console.error(' Database error:', err);
      return next({
        log: `Error adding post to database: ${err}`,
        status: 500,
        message: { err: 'Failed to add post' },
      });
    }
  },
};
