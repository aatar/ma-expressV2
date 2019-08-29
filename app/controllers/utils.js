const jwt = require('jsonwebtoken');
const logger = require('../logger');

exports.signJWT = payload => {
  logger.info('Signing JWT...');
  return jwt.sign(payload, process.env.PRIVATE_KEY, {
    algorithm: 'HS256'
  });
};
