const fetch = require('node-fetch');

const shouldNotInsertUser = body => {
  fetch('http://localhost:8080/users', {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  }).then(response => expect(response.status).toBe(400));
};

const shouldInsertUser = body => {
  fetch('http://localhost:8080/users', {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  }).then(response => expect(response.status).toBe(201));
};

const deleteAllUsers = () => {
  fetch('http://localhost:8080/users', {
    method: 'delete'
  });
};

module.exports = { shouldInsertUser, shouldNotInsertUser, deleteAllUsers };
