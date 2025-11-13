// server/__tests__/query.test.ts
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../server.js'; // Import the configured app

describe('GET /countries', () => {
  it('should return 200 OK and an array of data', async () => {
    const res = await request(app).get('/countries');

    // Check status code
    expect(res.statusCode).toBe(200);

    // Check if the response is an array (as expected from querycontroller)
    // console.log(res.body);
    expect(res.body).toBeInstanceOf(Array);
  });
});
