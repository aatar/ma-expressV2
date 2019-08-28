// const fetch = require('node-fetch');
// const { shouldNotInsertUser } = require('./helper');
const request = require('supertest');
const app = require('../app');
const { defaultUser } = require('./constants');

describe('POST /users', () => {
  beforeAll(() => {
    request(app).delete('/users');
  });

  /* test('It should delete users', async () => {
    const response = await request(app).delete('/users');
    expect(response.statusCode).toBe(200);
  });*/

  test('should insert user', async () => {
    const response = await request(app)
      .post('/users')
      .send(defaultUser)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(201);
  });

  test('already used email', async () => {
    await request(app)
      .post('/users')
      .send(defaultUser)
      .set('Accept', 'application/json');
    const response = await request(app)
      .post('/users')
      .send(defaultUser)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(400);
  });

  test('password is not valid', async () => {
    const response = await request(app)
      .post('/users')
      .send({ ...defaultUser, password: '234234' })
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(400);
  });

  test('email is not valid', async () => {
    const response = await request(app)
      .post('/users')
      .send({ ...defaultUser, email: 'marcos.atar@woleox.com.ar' })
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(400);
  });

  test('arguments missing', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: defaultUser.name,
        email: defaultUser.email,
        password: defaultUser.password
      })
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(400);
  });
});
/*
test('should delete users', () => {
  fetch('http://localhost:8080/users', {
    method: 'delete'
  }).then(response => expect(response.status).toBe(200));
});

test('should insert user', () => {
  const body = {
    name: 'Ariel',
    surname: 'Atar',
    email: 'marcos.atar@wolox.com.ar',
    password: '123123123'
  };
  fetch('http://localhost:8080/users', {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  }).then(response => expect(response.status).toBe(201));
});

test('already used email', () => {
  const body = {
    name: 'Ariel',
    surname: 'Atar',
    email: 'marcos.atar@wolox.com.ar',
    password: '123123123'
  };
  shouldNotInsertUser(body);
});

test('password is not valid', () => {
  const body = {
    name: 'Ariel',
    surname: 'Atar',
    email: 'marcos.atar2@wolox.com.ar',
    password: '23123'
  };
  shouldNotInsertUser(body);
});
test('arguments missing', () => {
  const body = {
    name: 'Ariel',
    email: 'ariel@wolox.com.ar',
    password: '123123123'
  };
  shouldNotInsertUser(body);
});

test('email is not valid', () => {
  const body = {
    name: 'Ariel',
    surname: 'Atar',
    email: 'arielatar@woleox.com.ar',
    password: '123123123'
  };
  shouldNotInsertUser(body);
});
*/
