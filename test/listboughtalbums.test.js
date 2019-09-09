const { authenticateUser, listBoughtAlbums } = require('./utils');
const { insertUser, insertAdminUser } = require('./factories');

describe('GET /users/:id/albums', () => {
  test('should list my own bought albums', async () => {
    const user = await insertUser();
    const loginResponse = await authenticateUser({ ...user, password: '123123123' });
    const token = `Bearer ${loginResponse.headers.authorization.substring(8)}`;
    const response = await listBoughtAlbums(user.id, token);
    expect(response.statusCode).toBe(200);
  });

  test('admin can access others bought albums', async () => {
    const adminUser = await insertAdminUser();
    const user = await insertUser();
    const loginResponse = await authenticateUser({ ...adminUser, password: '123123123' });
    const token = `Bearer ${loginResponse.headers.authorization.substring(8)}`;
    const response = await listBoughtAlbums(user.id, token);
    expect(response.statusCode).toBe(200);
  });

  test('should not list bought albums', async () => {
    const userOne = await insertUser();
    const userTwo = await insertUser();
    const loginResponse = await authenticateUser({ ...userOne, password: '123123123' });
    const token = `Bearer ${loginResponse.headers.authorization.substring(8)}`;
    const response = await listBoughtAlbums(userTwo.id, token);
    expect(response.statusCode).toBe(401);
  });
});
