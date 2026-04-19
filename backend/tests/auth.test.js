const request = require('supertest');
const app = require('../src/app');
const { setupTestDB } = require('./helpers/testDb');
const { buildRandomUserPayload } = require('./helpers/factories');

setupTestDB();

describe('Auth API', () => {
  test('POST /api/auth/signup should create user', async () => {
    const userPayload = buildRandomUserPayload();

    const response = await request(app).post('/api/auth/signup').send(userPayload);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.email).toBe(userPayload.email);
    expect(response.body).toHaveProperty('token');
  });

  test('POST /api/auth/login should return token', async () => {
    const userPayload = buildRandomUserPayload();

    await request(app).post('/api/auth/signup').send(userPayload).expect(201);

    const response = await request(app).post('/api/auth/login').send({
      email: userPayload.email,
      password: userPayload.password
    });

    expect(response.status).toBe(200);
    expect(response.body.email).toBe(userPayload.email);
    expect(response.body).toHaveProperty('token');
  });
});
