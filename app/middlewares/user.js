const { validationResult } = require('express-validator');

const { generateSignupError } = require('../helpers/utils');

const validateSignupFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = generateSignupError(errors.errors[0].msg);
    next(error);
  }
  next();
};

module.exports = { validateSignupFields, generateSignupError };
