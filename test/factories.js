const { factory } = require('factory-girl');
const { User } = require('../app/models');
const { user } = require('./utils');
const bcrypt = require('bcryptjs');

factory.define('User', User, user, {
  afterBuild: model =>
    bcrypt.hash(model.password, 10).then(hash => {
      model.password = hash;
      return model;
    })
});

exports.insertUser = async () => {
  const userFactoryGirlResponse = await factory.create('User');
  return userFactoryGirlResponse.dataValues;
};

exports.insertAdminUser = async () => {
  const adminUserFactoryGirlResponse = await factory.create('User', {
    email: 'marcos.atar3@wolox.com.ar',
    admin: true
  });
  return adminUserFactoryGirlResponse.dataValues;
};
