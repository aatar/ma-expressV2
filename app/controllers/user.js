const { User } = require('../models'),
  { signupError } = require('../errors'),
  { signUpMapper } = require('../mappers/user'),
  { serializeUser } = require('../serializers/user'),
  logger = require('../logger'),
  jwt = require('jsonwebtoken');

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

exports.login = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (user) {
        bcrypt.compare(req.body.password, user[0].password, (err, areEquals) => {
          if (areEquals) {
            const token = jwt.sign({ email: req.body.email }, process.env.PRIVATE_KEY, {
              algorithm: 'HS256'
            });
            res
              .status(200)
              .set('Authorization', `Bearer ${token}`)
              .send('OK');
          } else {
            throw signupError('Email or password is incorrect');
          }
        });
      } else {
        throw signupError('Email or password is incorrect');
      }
    })
    .catch(error => res.status(400).send(error));
};
