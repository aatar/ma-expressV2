const { User } = require('../models'),
  { generateSignupError } = require('./common'),
  { validateEmail, validatePassword } = require('../helpers/utils');
const md5 = require('crypto-js').MD5;

const add = (req, res, next) => {
  if (!validateEmail(req.body.email)) {
    const error = generateSignupError('Email is not valid');
    next(error);
  }
  if (!validatePassword(req.body.password)) {
    const error = generateSignupError('Password must be alphanumeric and have at least 8 characters');
    next(error);
  }

  return User.findAll({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (user.length > 0) {
        const error = generateSignupError('Email is already in use');
        next(error);
      }
      return User.create({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: md5(req.body.password).toString()
      }).then(userCreated => res.status(201).send(userCreated));
    })
    .catch(error => next(error));
};

module.exports = { add };
