const fetch = require('node-fetch');
const { shouldNotInsertUser } = require('./helper');

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
