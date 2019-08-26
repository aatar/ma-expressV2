const { User } = require('../models'),
  { signupError } = require('../errors'),
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
        const error = signupError('Email is already in use');
        next(error);
      }
      logger.info('Email is new.');
      signUpMapper(req.body).then(mappedUser => {
        logger.info('Creating user...');
        return User.create(mappedUser).then(userCreated => res.status(201).send(userCreated));
      });
    })
    .catch(error => next(error));
};
