const { createUser, authenticateUser } = require('./utils');
const { factory } = require('factory-girl');

let user = null;

beforeAll(async () => {
  const userFactoryGirlResponse = await factory.build('User');
  user = userFactoryGirlResponse.dataValues;
});

describe('POST /users/sessions', () => {
  test('should login', async () => {
    await createUser(user);
    const response = await authenticateUser(user);
    expect(response.statusCode).toBe(200);
  });

  test('incorrect email', async () => {
    await createUser(user);

    const modifiedUser = { ...user, email: 'marcos.atar32@wolox.com.ar' };
    const response = await authenticateUser(modifiedUser);

    expect(response.statusCode).toBe(401);
  });

  test('incorrect password', async () => {
    await createUser(user);

    const modifiedUser = { ...user, password: '1231231234' };
    const response = await authenticateUser(modifiedUser);
    expect(response.statusCode).toBe(401);
  });
});
