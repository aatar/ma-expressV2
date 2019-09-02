const request = require('supertest');
const { factory } = require('factory-girl');
const app = require('../app');

let user = null;

beforeAll(async () => {
  const userFactoryGirlResponse = await factory.build('User');
  user = userFactoryGirlResponse.dataValues;
});

describe('POST /users', () => {
  test('should insert user', async () => {
    const response = await request(app)
      .post('/users')
      .send(user)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(201);
  });

  test('already used email', async () => {
    await request(app)
      .post('/users')
      .send(user)
      .set('Accept', 'application/json');
    const response = await request(app)
      .post('/users')
      .send(user)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(409);
  });

  test('password is not valid', async () => {
    const modifiedUser = { ...user, password: '234234234' };
    const response = await request(app)
      .post('/users')
      .send(modifiedUser.dataValues)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(422);
  });

  test('email is not valid', async () => {
    const modifiedUser = { ...user, email: 'marcos.atar@woleox.com.ar' };
    const response = await request(app)
      .post('/users')
      .send(modifiedUser.dataValues)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(422);
  });

  test('arguments missing', async () => {
    delete user.surname;
    const response = await request(app)
      .post('/users')
      .send(user)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(422);
  });
});
