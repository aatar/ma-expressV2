const { User } = require('../models'),
  { signupError, signinError } = require('../errors'),
  { signUpMapper } = require('../mappers/user'),
  { serializeUser } = require('../serializers/user'),
  logger = require('../logger'),
  { signJWT, compare } = require('./utils');

const { TOKEN_START } = require('../constants');

exports.list = (req, res, next) => {
  User.findAndCountAll({ limit: req.query.limit, offset: req.skip, order: [['id', 'ASC']] })
    .then(results => {
      const itemCount = results.count;
      const pageCount = Math.ceil(results.count / req.query.limit);
      return res.send({
        page: results.rows.map(user => serializeUser(user)),
        currentPage: req.query.page,
        totalPages: pageCount,
        totalItems: itemCount
      });
    })
    .catch(next);
};

const add = (req, res, next, admin) => {
  logger.info('Searching user...');
  return User.findOne({
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
      return signUpMapper(req.body).then(mappedUser => {
        logger.info('Creating user...');
        return User.create(mappedUser)
          .then(userCreated => res.status(201).send(serializeUser(userCreated)))
          .catch(next);
      });
    })
    .catch(next);
};

exports.addUser = (req, res, next) => add(req, res, next, false);

exports.addAdmin = (req, res, next) => add(req, res, next, true);

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
          return res.set('Authorization', `${TOKEN_START} ${token}`).send('Logged in');
        }
        throw signinError('Email or password is incorrect');
      });
    })
    .catch(next);
};
