/* eslint-disable no-negated-condition */
const { User } = require('../models'),
  { notLoggedError } = require('../errors'),
  logger = require('../logger'),
  jwt = require('jsonwebtoken');

exports.verifyJWT = (authorizationToken, req, res, next) => {
  logger.info('Verifying JWT...');
  jwt.verify(authorizationToken, process.env.PRIVATE_KEY, (err, decoded) => {
    if (decoded && decoded.email && decoded.password) {
      logger.info('Searching user...');
      return User.findOne({
        where: {
          email: decoded.email,
          password: decoded.password
        }
      })
        .then(user => {
          if (!user) {
            throw notLoggedError("You don't have access, plase login");
          } else {
            return next();
          }
        })
        .catch(next);
    }
    throw notLoggedError("You don't have access, plase login");
  });
};
