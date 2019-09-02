const { factory } = require('factory-girl');
const { User } = require('../app/models');

factory.define('User', User, {
  name: 'Ariel',
  surname: 'Atar',
  email: 'marcos.atar@wolox.com.ar',
  password: '123123123'
});
