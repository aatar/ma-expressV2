const { User } = require('../models'),
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken');

const { TOKEN_START } = require('../constants');

const list = (req, res) => {
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
            const token = jwt.sign(
              { email: req.body.email, password: user[0].password },
              process.env.PRIVATE_KEY,
              {
                algorithm: 'HS256'
              }
            );
            res
              .status(200)
              .set('Authorization', TOKEN_START + token)
              .send('OK');
          } else {
            res.status(400).send('Password is incorrect');
          }
        });
      }
    })
    .catch(error => res.status(400).send(error));
};

module.exports = { list, add, deleteAll, login };
