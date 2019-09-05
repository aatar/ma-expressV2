const request = require('supertest');
const app = require('../app');

exports.createUser = user =>
  request(app)
    .post('/users')
    .send(user)
    .set('Accept', 'application/json');

exports.createAdminUser = (user, token = null) =>
  request(app)
    .post('/admin/users')
    .send(user)
    .set('Accept', 'application/json')
    .set('Authorization', token);

exports.authenticateUser = user =>
  request(app)
    .post('/users/sessions')
    .send(user)
    .set('Accept', 'application/json');
