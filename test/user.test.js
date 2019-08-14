const { insertUser, login, deleteAllUsers } = require('./common');
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
