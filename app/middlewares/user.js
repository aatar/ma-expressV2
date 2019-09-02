/* eslint-disable no-negated-condition */
const { User } = require('../models'),
  { TOKEN_START } = require('../constants'),
  { notLoggedError } = require('../errors'),
  jwt = require('jsonwebtoken');

exports.checkIfUserIsLogged = (req, res, next) => {
  let authorizationToken = req.headers.authorization;
  if (!authorizationToken) {
    throw notLoggedError('Missing authorization token');
  }
  if (authorizationToken.startsWith(TOKEN_START)) {
    authorizationToken = authorizationToken.substring(TOKEN_START.length);
    jwt.verify(authorizationToken, process.env.PRIVATE_KEY, (err, decoded) => {
      if (decoded && decoded.email && decoded.password) {
        User.findOne({
          where: {
            email: decoded.email,
            password: decoded.password
          }
        })
          .then(user => {
            if (!user) {
              throw notLoggedError("You don't have access, plase login");
            } else {
              next();
            }
          })
          .catch(next);
      } else {
        throw notLoggedError("You don't have access, plase login");
      }
    });
  } else {
    throw notLoggedError("You don't have access, plase login");
  }
};
