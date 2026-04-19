const request = require('supertest');
const app = require('../src/app');
const { setupTestDB } = require('./helpers/testDb');

setupTestDB();

describe('Health API', () => {
  test('GET /api/health should return server health', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });
});
