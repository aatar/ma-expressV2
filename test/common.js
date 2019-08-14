const fetch = require('node-fetch');

const insertUser = body =>
  fetch('http://localhost:8080/users', {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  });

const insertAdminUser = (body, token) =>
  fetch('http://localhost:8080/admin/users', {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', Authorization: token }
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

module.exports = { insertUser, insertAdminUser, login, deleteAllUsers, getUsers };
