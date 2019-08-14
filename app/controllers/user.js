const { User } = require('../models'),
  { signupError, signinError } = require('../errors'),
  { signUpMapper } = require('../mappers/user'),
  { serializeUser } = require('../serializers/user'),
  logger = require('../logger'),
  { signJWT, compare } = require('./utils');

exports.list = (req, res) => {
  User.findAndCountAll({ limit: req.query.limit, offset: req.skip })
    .then(results => {
      const itemCount = results.count;
      const pageCount = Math.ceil(results.count / req.query.limit);
      res.status(200).send({
        page: results.rows,
        currentPage: req.query.page,
        totalPages: pageCount,
        totalItems: itemCount
      });
    })
    .catch(error => res.status(400).send(error));
};

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
      if (!user) {
        throw signinError('Email is not registered in the system');
      }

      return compare(req.body.password, user.password).then(passwordIsFine => {
        if (passwordIsFine) {
          logger.info('Logged in');
          const token = signJWT(JSON.stringify(user));
          return res.set('Authorization', `Bearer ${token}`).send('Logged in');
        }
        throw signinError('Email or password is incorrect');
      });
    })
    .catch(next);
};
