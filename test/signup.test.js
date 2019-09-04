const { factory } = require('factory-girl');
const { createUser } = require('./utils');

let user = null;

beforeAll(async () => {
  const userFactoryGirlResponse = await factory.build('User');
  user = userFactoryGirlResponse.dataValues;
});

describe('POST /users', () => {
  test('should insert user', async () => {
    const response = await createUser(user);
    expect(response.statusCode).toBe(201);
  });

  test('already used email', async () => {
    await createUser(user);
    const response = await createUser(user);
    expect(response.statusCode).toBe(409);
  });

  test('password is not valid', async () => {
    const modifiedUser = { ...user, password: '121212' };
    const response = await createUser(modifiedUser);
    expect(response.statusCode).toBe(422);
  });

  test('email is not valid', async () => {
    const modifiedUser = { ...user, email: 'marcos.atar@woleox.com.ar' };
    const response = await createUser(modifiedUser);
    expect(response.statusCode).toBe(422);
  });

  test('arguments missing', async () => {
    delete user.surname;
    const response = await createUser(user);
    expect(response.statusCode).toBe(422);
  });
});
