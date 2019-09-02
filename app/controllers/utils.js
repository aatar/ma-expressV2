const jwt = require('jsonwebtoken');
const logger = require('../logger');
const bcrypt = require('bcryptjs');

exports.signJWT = payload => {
  logger.info('Signing JWT...');
  return jwt.sign(payload, process.env.PRIVATE_KEY, {
    algorithm: 'HS256',
    expiresIn: process.env.TOKEN_EXPIRATION_TIME
  });
};

exports.compare = (password, encodedPassword) => bcrypt.compare(password, encodedPassword);
