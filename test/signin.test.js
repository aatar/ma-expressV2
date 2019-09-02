const request = require('supertest');
const app = require('../app');
const { factory } = require('factory-girl');

let user = null;

beforeAll(async () => {
  const userFactoryGirlResponse = await factory.build('User');
  user = userFactoryGirlResponse.dataValues;
});

describe('POST /users/sessions', () => {
  test('should login', async () => {
    await request(app)
      .post('/users')
      .send(user)
      .set('Accept', 'application/json');
    const response = await request(app)
      .post('/users/sessions')
      .send(user)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(200);
  });

  test('incorrect email', async () => {
    await request(app)
      .post('/users')
      .send(user)
      .set('Accept', 'application/json');

    const modifiedUser = { ...user, email: 'marcos.atar32@wolox.com.ar' };
    const response = await request(app)
      .post('/users/sessions')
      .send(modifiedUser)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(401);
  });

  test('incorrect password', async () => {
    await request(app)
      .post('/users')
      .send(user)
      .set('Accept', 'application/json');

    const modifiedUser = { ...user, password: '1231231234' };
    const response = await request(app)
      .post('/users/sessions')
      .send(modifiedUser)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(401);
  });
});
