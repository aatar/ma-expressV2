<<<<<<< HEAD
const { User } = require('../models'),
  { signupError } = require('../errors'),
  { signUpMapper } = require('../mappers/user'),
  { serializeUser } = require('../serializers/user'),
  logger = require('../logger');

exports.addUser = (req, res, next) => {
  logger.info('Searching user...');
  return User.findOne({
=======
const { User } = require('../models');
const { validateEmail, validatePassword, validateArguments } = require('../helpers/utils');
const md5 = require('crypto-js').MD5;

const add = (req, res) => {
  if (!validateArguments(req.body)) {
    res.status(400).send('Argument/s missing');
  }
  if (!validateEmail(req.body.email)) {
    res.status(400).send('Email is not valid');
  }
  if (!validatePassword(req.body.password)) {
    res.status(400).send('Password must be alphanumeric and have at least 8 characters');
  }

  return User.findAll({
>>>>>>> finished
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
<<<<<<< HEAD
=======

const deleteAll = (req, res) =>
  User.destroy({
    truncate: true
  })
    .then(() => res.status(200).send('Deleted All'))
    .catch(error => res.status(400).send(error));

module.exports = { add, deleteAll };
>>>>>>> finished
