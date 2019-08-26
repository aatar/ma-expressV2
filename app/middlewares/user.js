const { validationResult } = require('express-validator');

const { signupError } = require('../errors');

const validateSignupFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = signupError(errors.errors[0].msg);
    next(error);
  }
  next();
};

module.exports = { validateSignupFields };
