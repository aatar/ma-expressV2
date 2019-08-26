/* eslint-disable no-underscore-dangle */
const Validator = require('schema-validator');

const { userSignUp: userSignUpSchema } = require('../schemas'),
  { generateSignupError } = require('../helpers/utils');

const validateSignupFields = (req, res, next) => {
  const validator = new Validator(userSignUpSchema);

  const check = validator.check(req.body);
  if (check._error) {
    if (check.email) {
      const error = generateSignupError('Email is not valid');
      next(error);
    }
    const error = generateSignupError('Password must be alphanumeric and have at least 8 characters');
    next(error);
  }
  next();
};

module.exports = { validateSignupFields, generateSignupError };
