const { User } = require('../models'),
  { generateSignupError } = require('../helpers/utils'),
  { signUpMapper } = require('../mappers/user');

const add = (req, res, next) =>
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (user) {
        const error = generateSignupError('Email is already in use');
        next(error);
      }
      signUpMapper(req.body).then(mappedUser => {
        User.create(mappedUser).then(userCreated => res.status(201).send(userCreated));
      });
    })
    .catch(error => next(error));

module.exports = { add };
