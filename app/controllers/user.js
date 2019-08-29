const { User } = require('../models'),
  { signupError, signinError } = require('../errors'),
  { signUpMapper } = require('../mappers/user'),
  { serializeUser } = require('../serializers/user'),
  logger = require('../logger'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcryptjs');

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

exports.login = (req, res, next) => {
  logger.info('Searching user...');
  return User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, areEquals) => {
          if (areEquals) {
            logger.info('Logged in');
            const { name, surname, email, password } = user;
            const token = jwt.sign({ name, surname, email, password }, process.env.PRIVATE_KEY, {
              algorithm: 'HS256'
            });
            return res.set('Authorization', `Bearer ${token}`).send('Logged in');
          }
          return next(signinError('Email or password is incorrect'));
        });
      } else {
        throw signinError('Email is not registered in the system');
      }
    })
    .catch(next);
};
