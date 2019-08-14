const { insertUser, login, deleteAllUsers, getUsers } = require('./common');
const { defaultUser } = require('./constants');

test('should list users', async () => {
  await deleteAllUsers();
  await insertUser(defaultUser);
  const loginBody = {
    email: defaultUser.email,
    password: defaultUser.password
  };
  const loginResponse = await login(loginBody);
  const token = loginResponse.headers.get('authorization');
  const response = await getUsers(token);
  deleteAllUsers();
  expect(response.status).toBe(200);
});

test('should not list users', async () => {
  await deleteAllUsers();
  await insertUser(defaultUser);
  const loginBody = {
    email: 'marcos.atar@wolox.com.ar',
    password: '123123123'
  };
  await login(loginBody);
  const response = await getUsers('Bearer fsdfdsf');
  deleteAllUsers();
  expect(response.status).toBe(400);
});
