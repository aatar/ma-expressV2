const User = require('../models').User;

module.exports = {
  add(req, res) {
    return User
      .create({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
      })
      .then((user) => res.status(201).send(user))
      .catch((error) => res.status(400).send(error));
  }
};
