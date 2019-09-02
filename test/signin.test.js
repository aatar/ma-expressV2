const request = require('supertest');
const app = require('../app');
const { defaultUser } = require('./constants');

describe('POST /users/sessions', () => {
  test('should login', async () => {
    await request(app)
      .post('/users')
      .send(defaultUser)
      .set('Accept', 'application/json');

    const user = { ...defaultUser };
    const response = await request(app)
      .post('/users/sessions')
      .send(user)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(200);
  });

  test('incorrect email', async () => {
    await request(app)
      .post('/users')
      .send(defaultUser)
      .set('Accept', 'application/json');

    const user = { ...defaultUser, email: 'marcos.atar32@wolox.com.ar' };
    const response = await request(app)
      .post('/users/sessions')
      .send(user)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(401);
  });

  test('incorrect password', async () => {
    await request(app)
      .post('/users')
      .send(defaultUser)
      .set('Accept', 'application/json');

    const user = { ...defaultUser, password: '1231231234' };
    const response = await request(app)
      .post('/users/sessions')
      .send(user)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(401);
  });
});
