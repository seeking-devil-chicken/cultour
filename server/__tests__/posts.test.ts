// server/__tests__/posts.test.ts
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../server.js'; // Import the configured app

describe('POST /userpost', () => {
  it('should return 200 OK and an array of data', async () => {
    //   const { country, category, title, text, image } = req.body;
    //   const user_id = 1; // HARDCODED THIS VALUE

    //   const result = await database.query(
    //     'INSERT INTO posts (user_id, country, category, title, text, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    //     [user_id, country, category, title, text, image] // Include user_id here
    //   );

    const mockPost = {
      user_id: 1,
      country: 'United States',
      category: 'Media',
      title: 'Test',
      text: 'Description for this mockPost',
      image: 'https://petazi.com/demo/images/turkey.jpg',
    };

    const res = await request(app).post('/userpost').send(mockPost);

    // Check status code
    expect(res.statusCode).toBe(200);

    // Check if the response is an array (as expected from querycontroller)
    console.log(res.body);
    expect(res.body.id).not.toBeNull();
  });
});
