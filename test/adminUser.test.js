const { insertUser, insertAdminUser, login, deleteAllUsers } = require('./common');
const { defaultUser } = require('./constants');

test('should insert admin user', async () => {
  await deleteAllUsers();
  await insertAdminUser(defaultUser, false);
  const loginBody = {
    email: defaultUser.email,
    password: defaultUser.password
  };
  const loginResponse = await login(loginBody);
  const token = loginResponse.headers.get('authorization');
  const anotherUser = {
    name: 'Ariel',
    surname: 'Atar',
    email: 'marcos.atar10@wolox.com.ar',
    password: '123123123'
  };
  const response = await insertAdminUser(anotherUser, token);
  deleteAllUsers();
  expect(response.status).toBe(201);
});

test('should update admin user', async () => {
  await deleteAllUsers();
  await insertAdminUser(defaultUser, false);
  const anotherUser = {
    name: 'Ariel',
    surname: 'Atar',
    email: 'marcos.atar2@wolox.com.ar',
    password: '123123123'
  };
  await insertUser(anotherUser);
  const loginBody = {
    email: defaultUser.email,
    password: defaultUser.password
  };
  const loginResponse = await login(loginBody);
  const token = loginResponse.headers.get('authorization');
  const response = await insertAdminUser(anotherUser, token);
  deleteAllUsers();
  expect(response.status).toBe(200);
});

test('should not insert admin user', async () => {
  await deleteAllUsers();
  await insertAdminUser(defaultUser, false);
  const loginBody = {
    email: defaultUser.email,
    password: defaultUser.password
  };
  await login(loginBody);
  const anotherUser = {
    name: 'Ariel',
    surname: 'Atar',
    email: 'marcos.atar10@wolox.com.ar',
    password: '123123123'
  };
  const response = await insertAdminUser(anotherUser, 'Bearer fdfsd');
  deleteAllUsers();
  expect(response.status).toBe(400);
});
