const { TOKEN_START } = require('../constants'),
  { notLoggedError } = require('../errors'),
  { verifyJWT } = require('./utils');

exports.checkIfUserIsLogged = (req, res, next) => {
  let authorizationToken = req.headers.authorization;
  if (!authorizationToken || !authorizationToken.startsWith(TOKEN_START)) {
    return next(notLoggedError('Missing authorization token'));
  }
  authorizationToken = authorizationToken.substring(TOKEN_START.length);
  return verifyJWT(authorizationToken)
    .then(() => next())
    .catch(next);
};
