const request = require('supertest');
const app = require('../src/app');
const { setupTestDB } = require('./helpers/testDb');

setupTestDB();

describe('Protected Routes', () => {
  test('GET /api/users/profile should require token', async () => {
    const response = await request(app).get('/api/users/profile');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });
});
