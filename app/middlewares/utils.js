/* eslint-disable indent */
const { User } = require('../models'),
  { notLoggedError } = require('../errors'),
  logger = require('../logger'),
  jwt = require('jsonwebtoken');

exports.verifyJWT = (authorizationToken, admin) => {
  logger.info('Verifying JWT...');
  return new Promise((resolve, reject) => {
    jwt.verify(authorizationToken, process.env.PRIVATE_KEY, (err, decoded) => {
      if (decoded && decoded.email && decoded.password && (!admin || decoded.admin)) {
        logger.info('Searching user...');
        return User.findOne({
          where: {
            email: decoded.email,
            password: decoded.password
          }
        })
          .then(user => {
            logger.info('Search finished.');
            return user
              ? resolve()
              : reject(
                  // eslint-disable-next-line indent
                  notLoggedError(
                    admin
                      ? 'You have to be logged in as an admin user'
                      : "You don't have access, please login"
                  )
                );
          })
          .catch(reject);
      }
      return reject(
        notLoggedError(
          admin ? 'You have to be logged in as an admin user' : "You don't have access, please login"
        )
      );
    });
  });
};
