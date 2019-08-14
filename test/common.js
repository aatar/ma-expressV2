const fetch = require('node-fetch');

const insertUser = body =>
  fetch('http://localhost:8080/users', {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  });

const login = body =>
  fetch('http://localhost:8080/users/sessions', {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  });

const deleteAllUsers = () =>
  fetch('http://localhost:8080/users', {
    method: 'delete'
  });

module.exports = { insertUser, login, deleteAllUsers };
