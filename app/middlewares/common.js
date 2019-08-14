const { checkSchema, validationResult } = require('express-validator');

const { schemaError, notLoggedError } = require('../errors');

exports.validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(schemaError(errors.errors.map(error => error.msg)));
  }
  return next();
};

exports.validateSchema = schema => [checkSchema(schema), exports.validateResult];

exports.reportNotLoggedUser = (req, res, next) => next(notLoggedError("You don't have access, plase login"));
