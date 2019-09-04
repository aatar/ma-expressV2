const { TOKEN_START } = require('../constants'),
  { notLoggedError } = require('../errors'),
  { verifyJWT } = require('./utils'),
  logger = require('../logger');

exports.checkIfUserIsLogged = (req, res, next) => {
  let authorizationToken = req.headers.authorization;
  if (!authorizationToken || !authorizationToken.startsWith(TOKEN_START)) {
    return next(notLoggedError('Missing authorization token'));
  }
  authorizationToken = authorizationToken.substring(TOKEN_START.length);
  return verifyJWT(authorizationToken)
    .then(() => {
      logger.info('User authenticated');
      return next();
    })
    .catch(next);
};
