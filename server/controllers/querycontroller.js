// import { Request, Response, NextFunction } from "express";
import database from '../models/database.js';

export default {
  // MIDDLEWARE FOR COUNTRIES
  getQuery: async (req, res, next) => {
    try {
      const result = await database.query('SELECT * FROM posts');
      const finalres = result.rows;
      console.log(finalres);

      if (!finalres) {
        return next({
          log: 'something went wrong in the getQuery middleware',
          message: 'could not fetch data from the database',
        });
      } else {
        res.locals.result = finalres;
        return next();
      }
    } catch (err) {
      console.error('Unable to query requested items', err);
      res.status(500).json({ error: 'Database query failed' });
    }

    return next();
  },
};
