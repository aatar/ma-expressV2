const { User } = require('../models'),
  { signupError } = require('../errors'),
  { signUpMapper } = require('../mappers/user'),
  { serializeUser } = require('../serializers/user'),
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
        throw signupError('Email is already in use');
      }
      logger.info('Email is new.');
      return signUpMapper(req.body).then(mappedUser => {
        logger.info('Creating user...');
        return User.create(mappedUser).then(userCreated => res.status(201).send(serializeUser(userCreated)));
      });
    })
    .catch(next);
};

exports.deleteAll = (req, res, next) =>
  User.destroy({
    truncate: true
  })
    .then(() => res.status(200).send('Deleted All'))
    .catch(next);
