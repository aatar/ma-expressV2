const fetch = require('node-fetch');
const { shouldNotInsertUser } = require('./common');
const { defaultUser } = require('./constants');

test('should delete users', () => {
  fetch('http://localhost:8080/users', {
    method: 'delete'
  }).then(response => expect(response.status).toBe(200));
});

test('should insert user', () => {
  fetch('http://localhost:8080/users', {
    method: 'post',
    body: JSON.stringify(defaultUser),
    headers: { 'Content-Type': 'application/json' }
  }).then(response => expect(response.status).toBe(201));
});

test('already used email', () => {
  fetch('http://localhost:8080/users', {
    method: 'post',
    body: JSON.stringify(defaultUser),
    headers: { 'Content-Type': 'application/json' }
  }).then(() => shouldNotInsertUser(defaultUser));
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

test('should login', () => {
  fetch('http://localhost:8080/users', {
    method: 'post',
    body: JSON.stringify(defaultUser),
    headers: { 'Content-Type': 'application/json' }
  }).then(() => {
    const loginBody = {
      email: 'marcos.atar@wolox.com.ar',
      password: '123123123'
    };
    fetch('http://localhost:8080/users/sessions', {
      method: 'post',
      body: JSON.stringify(loginBody),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => expect(response.status).toBe(200));
  });
});

test('incorrect user or password', () => {
  const body = {
    email: 'marcos.atar32@wolox.com.ar',
    password: '123123123'
  };
  fetch('http://localhost:8080/users/sessions', {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  }).then(response => expect(response.status).toBe(400));
});

test('incorrect password', () => {
  const body = {
    email: 'marcos.atar@wolox.com.ar',
    password: '1231231234'
  };
  fetch('http://localhost:8080/users/sessions', {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  }).then(response => expect(response.status).toBe(400));
});
