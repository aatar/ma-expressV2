/* eslint-disable no-negated-condition */
const { validateEmail, validatePassword, validateArguments } = require('../helpers/utils');

const add = (req, res, next) => {
  if (!validateArguments(req.body)) {
    res.status(400).send('Argument/s missing');
  } else if (!validateEmail(req.body.email)) {
    res.status(400).send('Email is not valid');
  } else if (!validatePassword(req.body.password)) {
    res.status(400).send('Password must be alphanumeric and have at least 8 characters');
  } else {
    next();
  }
};

module.exports = { add };
