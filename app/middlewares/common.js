const { checkSchema, validationResult } = require('express-validator');

const { schemaError, notLoggedError } = require('../errors'),
  { verifyJWT } = require('./utils'),
  { TOKEN_START } = require('../constants');

exports.validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(schemaError(errors.errors.map(error => error.msg)));
  }
  return next();
};

exports.validateSchema = schema => [checkSchema(schema), exports.validateResult];

exports.reportNotLoggedUser = (req, res, next, admin) =>
  next(
    notLoggedError(
      admin ? 'You have to be logged in as an admin user' : "You don't have access, please login"
    )
  );

exports.checkIfUserIsLogged = (req, res, next, admin) => {
  let authorizationToken = req.headers.authorization;
  if (authorizationToken && authorizationToken.startsWith(TOKEN_START)) {
    authorizationToken = authorizationToken.substring(TOKEN_START.length);
    return verifyJWT(authorizationToken, admin)
      .then(() => next())
      .catch(next);
  }
  return exports.reportNotLoggedUser(req, res, next, admin);
};
