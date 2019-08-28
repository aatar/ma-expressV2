const request = require('supertest');
const app = require('../app');
const { defaultUser } = require('./constants');

describe('POST /users', () => {
  test('should insert user', async () => {
    const response = await request(app)
      .post('/users')
      .send(defaultUser)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(201);
  });

  test('already used email', async () => {
    await request(app)
      .post('/users')
      .send(defaultUser)
      .set('Accept', 'application/json');
    const response = await request(app)
      .post('/users')
      .send(defaultUser)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(409);
  });

  test('password is not valid', async () => {
    const response = await request(app)
      .post('/users')
      .send({ ...defaultUser, password: '234234' })
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(422);
  });

  test('email is not valid', async () => {
    const response = await request(app)
      .post('/users')
      .send({ ...defaultUser, email: 'marcos.atar@woleox.com.ar' })
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(422);
  });

  test('arguments missing', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        ...defaultUser,
        surname: null
      })
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(422);
  });
});
