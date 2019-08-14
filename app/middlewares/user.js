const { checkIfUserIsLogged: userCheck } = require('./common'),
  { User } = require('../models');

exports.checkIfUserIsLogged = (req, res, next) => userCheck(req, res, next, false);

exports.checkIfUserIsAdmin = (req, res, next) => {
  User.findAll().then(users => {
    if (users.length > 0) {
      userCheck(req, res, next, true);
    } else {
      next();
    }
  });
};
