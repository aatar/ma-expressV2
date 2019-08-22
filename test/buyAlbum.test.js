const { insertUser, login, deleteAllUsers, deleteAllAlbums, buyAlbum } = require('./common');
const { defaultUser } = require('./constants');

test('should buy album', async () => {
  await deleteAllUsers();
  await insertUser(defaultUser);
  const loginBody = {
    email: defaultUser.email,
    password: defaultUser.password
  };
  const loginResponse = await login(loginBody);
  const token = loginResponse.headers.get('authorization');
  const response = await buyAlbum(1, token);
  await deleteAllUsers();
  await deleteAllAlbums();
  expect(response.statusCode).toBe(201);
  expect(response.body).toBe('OK, bought album');
});

test('should not buy album', async () => {
  await deleteAllUsers();
  await insertUser(defaultUser);
  const loginBody = {
    email: defaultUser.email,
    password: defaultUser.password
  };
  const loginResponse = await login(loginBody);
  const token = loginResponse.headers.get('authorization');
  await buyAlbum(1, token);
  buyAlbum(1, token)
    .then()
    .catch(error => {
      expect(error.message).toContain('You have already bought that album');
    });
});
