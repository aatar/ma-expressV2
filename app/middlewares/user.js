/* eslint-disable no-negated-condition */
const {
    validateEmail,
    validatePassword,
    validateArgumentsSignup,
    validateArgumentsLogin
  } = require('../helpers/utils'),
  { User } = require('../models'),
  { reportNotLoggedUser } = require('./common'),
  { TOKEN_START } = require('../constants'),
  jwt = require('jsonwebtoken');

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

const checkIfUserIsLogged = (req, res, next) => {
  let authorizationToken = req.headers.authorization;
  if (authorizationToken.startsWith(TOKEN_START)) {
    authorizationToken = authorizationToken.substring(TOKEN_START.length);
    jwt.verify(authorizationToken, process.env.PRIVATE_KEY, (err, decoded) => {
      if (decoded && decoded.email && decoded.password) {
        User.findAll({
          where: {
            email: decoded.email,
            password: decoded.password
          }
        })
          .then(user => {
            if (user.length <= 0) {
              reportNotLoggedUser(res);
            } else {
              next();
            }
          })
          .catch(error => res.status(400).send(error));
      } else {
        reportNotLoggedUser(res);
      }
    });
  } else {
    reportNotLoggedUser(res);
  }
};

module.exports = { add, login, checkIfUserIsLogged };
