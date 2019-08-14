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

const getUsers = token =>
  fetch('http://localhost:8080/users', {
    method: 'get',
    headers: { 'Content-Type': 'application/json', Authorization: token }
  });

module.exports = { insertUser, login, deleteAllUsers, getUsers };
