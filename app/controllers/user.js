/* eslint-disable no-negated-condition */
const { User } = require('../models');
const { validateEmail, validatePassword, validateArguments } = require('../helpers/utils');
const md5 = require('crypto-js').MD5;

const add = (req, res) => {
  if (!validateArguments(req.body)) {
    res.status(400).send('Argument/s missing');
  } else if (!validateEmail(req.body.email)) {
    res.status(400).send('Email is not valid');
  } else if (!validatePassword(req.body.password)) {
    res.status(400).send('Password must be alphanumeric and have at least 8 characters');
  } else {
    return User.findAll({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (user.length > 0) {
          res.status(400).send('Email is already in use');
        }
        return User.create({
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          password: md5(req.body.password).toString()
        })
          .then(() => res.status(201).send('OK'))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  return '';
};

const deleteAll = (req, res) =>
  User.destroy({
    truncate: true
  })
    .then(() => res.status(200).send('Deleted All'))
    .catch(error => res.status(400).send(error));

module.exports = { add, deleteAll };
