const { insertUser, login, deleteAllUsers } = require('./common');
const { defaultUser } = require('./constants');

test('should login', async () => {
  await deleteAllUsers();
  await insertUser(defaultUser);
  const loginBody = {
    email: 'marcos.atar@wolox.com.ar',
    password: '123123123'
  };
  const response = await login(loginBody);
  deleteAllUsers();
  expect(response.status).toBe(200);
});

test('incorrect user or password', async () => {
  await deleteAllUsers();
  await insertUser(defaultUser);
  const loginBody = {
    email: 'marcos.atar32@wolox.com.ar',
    password: '123123123'
  };
  const response = await login(loginBody);
  deleteAllUsers();
  expect(response.status).toBe(400);
});

test('incorrect password', async () => {
  await deleteAllUsers();
  await insertUser(defaultUser);
  const loginBody = {
    email: 'marcos.atar@wolox.com.ar',
    password: '1231231234'
  };
  const response = await login(loginBody);
  deleteAllUsers();
  expect(response.status).toBe(400);
});
