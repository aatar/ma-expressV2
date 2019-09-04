const { User } = require('../models'),
  { notLoggedError } = require('../errors'),
  logger = require('../logger'),
  jwt = require('jsonwebtoken');

exports.verifyJWT = authorizationToken => {
  logger.info('Verifying JWT...');
  return new Promise((resolve, reject) => {
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
            logger.info('Search finished.');
            return user ? resolve() : reject(notLoggedError("You don't have access, please login"));
          })
          .catch(reject);
      }
      return reject(notLoggedError("You don't have access, please login"));
    });
  });
};
