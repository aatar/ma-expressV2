const { insertUser, insertAdminUser, login, deleteAllUsers, getUsers } = require('./common');
const { defaultUser } = require('./constants');

test('should insert user', async () => {
  await deleteAllUsers();
  const response = await insertUser(defaultUser);
  deleteAllUsers();
  expect(response.status).toBe(201);
});

test('already used email', async () => {
  await deleteAllUsers();
  await insertUser(defaultUser);
  const response = await insertUser(defaultUser);
  deleteAllUsers();
  expect(response.status).toBe(400);
});

test('password is not valid', async () => {
  const body = {
    name: 'Ariel',
    surname: 'Atar',
    email: 'marcos.atar2@wolox.com.ar',
    password: '23123'
  };
  const response = await insertUser(body);
  expect(response.status).toBe(400);
});

test('arguments missing', async () => {
  const body = {
    name: 'Ariel',
    email: 'ariel@wolox.com.ar',
    password: '123123123'
  };
  const response = await insertUser(body);
  expect(response.status).toBe(400);
});

test('email is not valid', async () => {
  const body = {
    name: 'Ariel',
    surname: 'Atar',
    email: 'arielatar@woleox.com.ar',
    password: '123123123'
  };
  const response = await insertUser(body);
  expect(response.status).toBe(400);
});

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
