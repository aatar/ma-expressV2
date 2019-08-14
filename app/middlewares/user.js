/* eslint-disable no-negated-condition */
const {
    validateEmail,
    validatePassword,
    validateArgumentsSignup,
    validateArgumentsLogin
  } = require('../helpers/utils'),
  { checkIfUserIsLogged: userCheck } = require('./common');

const add = (req, res, next) => {
  if (!validateArgumentsSignup(req.body)) {
    res.status(400).send('Argument/s missing');
  } else if (!validateEmail(req.body.email)) {
    res.status(400).send('Email is not valid');
  } else if (!validatePassword(req.body.password)) {
    res.status(400).send('Password must be alphanumeric and have at least 8 characters');
  } else {
    next();
  }
};

const login = (req, res, next) => {
  if (!validateArgumentsLogin(req.body)) {
    res.status(400).send('Argument/s missing');
  } else if (!validateEmail(req.body.email)) {
    res.status(400).send('Email is not valid');
  } else {
    next();
  }
};

const checkIfUserIsLogged = (req, res, next) => userCheck(req, res, next, false);

const checkIfUserIsAdmin = (req, res, next) => userCheck(req, res, next, true);

module.exports = { add, login, checkIfUserIsLogged, checkIfUserIsAdmin };
