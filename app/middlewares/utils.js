const { User } = require('../models'),
  { notLoggedError } = require('../errors'),
  logger = require('../logger'),
  jwt = require('jsonwebtoken');

const verifyJWTPromise = authorizationToken =>
  new Promise((resolve, reject) => {
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
              reject(notLoggedError("You don't have access, plase login"));
            }
            resolve();
          })
          .catch(reject);
      }
      return reject(notLoggedError("You don't have access, plase login"));
    });
  });

exports.verifyJWT = authorizationToken => {
  logger.info('Verifying JWT...');
  return verifyJWTPromise(authorizationToken);
};
