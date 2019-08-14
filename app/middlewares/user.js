/* eslint-disable no-negated-condition */
const { User } = require('../models'),
  { reportNotLoggedUser } = require('./utils'),
  { TOKEN_START } = require('../constants'),
  jwt = require('jsonwebtoken');

exports.checkIfUserIsLogged = (req, res, next) => {
  let authorizationToken = req.headers.authorization;
  if (authorizationToken.startsWith(TOKEN_START)) {
    authorizationToken = authorizationToken.substring(TOKEN_START.length);
    jwt.verify(authorizationToken, process.env.PRIVATE_KEY, (err, decoded) => {
      if (decoded && decoded.email && decoded.password) {
        User.findAll({
          where: {
            email: decoded.email,
            password: decoded.password
          }
        })
          .then(user => {
            if (user.length <= 0) {
              reportNotLoggedUser(res);
            } else {
              next();
            }
          })
          .catch(error => res.status(400).send(error));
      } else {
        reportNotLoggedUser(res);
      }
    });
  } else {
    reportNotLoggedUser(res);
  }
};
