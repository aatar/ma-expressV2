const { factory } = require('factory-girl');
const { createUser, createAdminUser, authenticateUser } = require('./utils');

let user = null;
let adminUser = null;

beforeAll(async () => {
  const userFactoryGirlResponse = await factory.build('User');
  user = userFactoryGirlResponse.dataValues;
  adminUser = { ...user, admin: true };
});

describe('POST /admin/users', () => {
  test('should insert admin user', async () => {
    await createAdminUser(adminUser);
    const loginResponse = await authenticateUser(adminUser);
    const token = `Bearer ${loginResponse.headers.authorization.substring(8)}`;
    const response = await createAdminUser({ ...adminUser, email: 'marcos.atar2@wolox.com.ar' }, token);
    expect(response.statusCode).toBe(201);
  });

  test('should update user to be admin', async () => {
    await createAdminUser(adminUser);
    await createUser({ ...user, email: 'marcos.atar2@wolox.com.ar' });
    const loginResponse = await authenticateUser(adminUser);
    const token = `Bearer ${loginResponse.headers.authorization.substring(8)}`;
    const response = await createAdminUser({ ...user, email: 'marcos.atar2@wolox.com.ar' }, token);
    expect(response.statusCode).toBe(200);
  });

  test('should not insert admin user', async () => {
    await createAdminUser(adminUser);
    const response = await createAdminUser({ ...adminUser, email: 'marcos.atar2@wolox.com.ar' });
    expect(response.statusCode).toBe(401);
  });
});
