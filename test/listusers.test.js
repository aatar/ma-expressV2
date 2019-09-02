const request = require('supertest');
const app = require('../app');
const { defaultUser } = require('./constants');

describe('GET /users', () => {
  test('token missing', async () => {
    await request(app)
      .post('/users')
      .send(defaultUser)
      .set('Accept', 'application/json');

    const user = { ...defaultUser };
    await request(app)
      .post('/users/sessions')
      .send(user)
      .set('Accept', 'application/json');
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(401);
  });

  test('invalid token', async () => {
    await request(app)
      .post('/users')
      .send(defaultUser)
      .set('Accept', 'application/json');

    const user = { ...defaultUser };
    await request(app)
      .post('/users/sessions')
      .send(user)
      .set('Accept', 'application/json');
    const response = await request(app)
      .get('/users')
      .set('Authorization', 'blabla');
    expect(response.statusCode).toBe(401);
  });

  test('should list users', async () => {
    await request(app)
      .post('/users')
      .send(defaultUser)
      .set('Accept', 'application/json');

    const user = { ...defaultUser };
    const loginResponse = await request(app)
      .post('/users/sessions')
      .send(user)
      .set('Accept', 'application/json');
    const token = `Bearer ${loginResponse.headers.authorization.substring(8)}`;
    const response = await request(app)
      .get('/users')
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
  });
});
