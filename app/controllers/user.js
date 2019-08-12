const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const add = (req, res) =>
  User.findAll({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (user.length > 0) {
        res.status(400).send('Email is already in use');
      }
      bcrypt.hash(req.body.password, 10).then(hashedPassword =>
        User.create({
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          password: hashedPassword
        })
          .then(() => res.status(201).send('OK'))
          .catch(error => res.status(400).send(error))
      );
    })
    .catch(error => res.status(400).send(error));

const deleteAll = (req, res) =>
  User.destroy({
    truncate: true
  })
    .then(() => res.status(200).send('Deleted All'))
    .catch(error => res.status(400).send(error));

const login = (req, res) => {
  User.findAll({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (user.length <= 0) {
        res.status(400).send('Email or password is incorrect');
      } else {
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
            res.status(400).send('Password is incorrect');
          }
        });
      }
    })
    .catch(error => res.status(400).send(error));
};

module.exports = { add, deleteAll, login };
