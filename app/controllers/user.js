const { User } = require('../models'),
  { conflictError } = require('../errors'),
  { signUpMapper } = require('../mappers/user'),
  logger = require('../logger');

exports.addUser = (req, res, next) => {
  logger.info('Searching user...');
  return User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (user) {
        throw conflictError('Email is already in use');
      }
      logger.info('Email is new.');
      return signUpMapper(req.body).then(mappedUser => {
        logger.info('Creating user...');
        return User.create(mappedUser).then(userCreated => res.status(201).send(userCreated));
      });
    })
    .catch(next);
};
