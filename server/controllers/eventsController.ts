import { Request, Response, NextFunction } from 'express';
import database from '../models/database.js';

interface EventQuery {
  country?: string;
  startDate?: string;
  endDate?: string;
}

export default {
  getEvents: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { country, startDate, endDate } = req.query as EventQuery;

      let baseQuery = 'SELECT * FROM events';
      const conditions: string[] = [];
      const params: any[] = [];

      if (country) {
        params.push(country);
        conditions.push(`country = $${params.length}`);
      }

      if (startDate) {
        params.push(startDate);
        conditions.push(`event_datetime >= $${params.length}`);
      }

      if (endDate) {
        params.push(endDate);
        conditions.push(`event_datetime <= $${params.length}`);
      }

      if (!startDate) {
        conditions.push('event_datetime >= NOW()');
      }

      if (conditions.length > 0) {
        baseQuery += ' WHERE ' + conditions.join(' AND ');
      }

      baseQuery += ' ORDER BY event_datetime ASC LIMIT 50';

      const result = await database.query(baseQuery, params);

      res.locals.events = result.rows;
      return next();
    } catch (err) {
      console.error('Unable to query requested events', err);
      return next({
        log: `Error in eventsController.getEvents: ${err}`,
        status: 500,
        message: { err: 'Database query for events failed' },
      });
    }
  },

  getEventById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const eventQuery = 'SELECT * FROM events WHERE id = $1';
      const eventResult = await database.query(eventQuery, [id]);

      if (eventResult.rows.length === 0) {
        return res.status(404).json({ error: 'Event not found' });
      }

      const eventDetails = eventResult.rows[0];
      const { country } = eventDetails;

      const postsQuery = 'SELECT * FROM posts WHERE country = $1 LIMIT 2';
      const postsResult = await database.query(postsQuery, [country]);

      const responseData = {
        eventDetails: eventDetails,
        relatedPosts: postsResult.rows,
      };

      res.locals.eventDetails = responseData;
      return next();
    } catch (err) {
      console.error('Unable to query event details', err);
      return next({
        log: `Error in eventsController.getEventById: ${err}`,
        status: 500,
        message: { err: 'Database query for event details failed' },
      });
    }
  },
};
