const { User } = require('../models'),
  { signupError } = require('../errors'),
  { signUpMapper } = require('../mappers/user'),
  { serializeUser } = require('../serializers/user'),
  logger = require('../logger');

exports.add = (req, res, next, admin) =>
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (user) {
        if (admin) {
          return User.update({ admin: true }, { where: { email: req.body.email } })
            .then(() => res.send('OK'))
            .catch(next);
        }
        return next(signupError('Email is already in use'));
      }
      logger.info('Email is new.');
      return signUpMapper({ ...req.body, admin }).then(mappedUser => {
        logger.info('Creating user...');
        return User.create(mappedUser)
          .then(userCreated => res.status(201).send(serializeUser(userCreated)))
          .catch(next);
      });
    })
    .catch(next);
