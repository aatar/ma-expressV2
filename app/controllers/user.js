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

const add = async (req, res, next, admin) => {
  try {
    logger.info('Searching user...');
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (user) {
      if (admin) {
        await User.update({ admin: true }, { where: { email: req.body.email } });
        return res.send('OK, updated');
      }
      return next(signupError('Email is already in use'));
    }
    logger.info('Email is new.');
    const mappedUser = await signUpMapper({ ...req.body, admin });
    logger.info('Creating user...');
    const createdUser = await User.create(mappedUser);
    return res.status(201).send(serializeUser(createdUser));
  } catch (error) {
    return next(error);
  }
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
