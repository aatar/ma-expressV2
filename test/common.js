const fetch = require('node-fetch');

const getUsers = token =>
  fetch('http://localhost:8080/users', {
    method: 'get',
    headers: { 'Content-Type': 'application/json', Authorization: token }
  });

module.exports = { getUsers };
