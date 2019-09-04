const request = require('supertest');
const app = require('../app');
const { factory } = require('factory-girl');
const { createUser, authenticateUser } = require('./utils');

let user = null;

beforeAll(async () => {
  const userFactoryGirlResponse = await factory.build('User');
  user = userFactoryGirlResponse.dataValues;
});

describe('GET /users', () => {
  test('token missing', async () => {
    await createUser(user);
    let response = '';
    await Promise.all([
      authenticateUser(user),
      // eslint-disable-next-line no-async-promise-executor
      new Promise(async resolve => {
        response = await request(app).get('/users');
        return resolve();
      })
    ]);
    expect(response.statusCode).toBe(401);
  });

  test('invalid token', async () => {
    await createUser(user);
    await authenticateUser(user);
    const response = await request(app)
      .get('/users')
      .set('Authorization', 'blabla');
    expect(response.statusCode).toBe(401);
  });

  test('should list users', async () => {
    await createUser(user);
    const loginResponse = await authenticateUser(user);
    const token = `Bearer ${loginResponse.headers.authorization.substring(8)}`;
    const response = await request(app)
      .get('/users')
      .set('Authorization', token);
    expect(response.statusCode).toBe(200);
  });
});
