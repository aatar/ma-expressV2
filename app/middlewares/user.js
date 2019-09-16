const { checkIfUserIsLogged: userCheck } = require('./utils');

exports.checkIfUserIsLogged = (req, res, next) => userCheck(req, res, next, false);

exports.checkIfUserIsAdmin = (req, res, next) => userCheck(req, res, next, true);
