const { checkIfUserIsLogged: userCheck } = require('./utils'),
  { notHasAccessError } = require('../errors');

exports.checkIfUserIsLogged = (req, res, next) => userCheck(req, res, next, false);

exports.checkIfUserIsAdmin = (req, res, next) => userCheck(req, res, next, true);

exports.checkIfUserHasAccess = (req, res, next) => {
  if (req.params.admin || req.params.userId.toString() === req.params.id) {
    return next();
  }
  return next(notHasAccessError('You do not have access'));
};
