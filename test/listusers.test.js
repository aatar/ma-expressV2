const request = require('supertest');
const app = require('../app');
const { factory } = require('factory-girl');

let user = null;

beforeAll(async () => {
  const userFactoryGirlResponse = await factory.build('User');
  user = userFactoryGirlResponse.dataValues;
});

describe('GET /users', () => {
  test('token missing', async () => {
    await request(app)
      .post('/users')
      .send(user)
      .set('Accept', 'application/json');
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
      .send(user)
      .set('Accept', 'application/json');
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
      .send(user)
      .set('Accept', 'application/json');
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
