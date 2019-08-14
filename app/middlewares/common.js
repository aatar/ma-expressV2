const { User } = require('../models'),
  { TOKEN_START } = require('../constants'),
  jwt = require('jsonwebtoken');

const reportNotLoggedUser = (res, admin) =>
  res
    .status(400)
    .send(admin ? 'You have to be logged in as an admin user' : "You don't have access, plase login");

const checkIfUserIsLogged = (req, res, next, admin) => {
  let authorizationToken = req.headers.authorization;
  if (authorizationToken && authorizationToken.startsWith(TOKEN_START)) {
    authorizationToken = authorizationToken.substring(TOKEN_START.length);
    jwt.verify(authorizationToken, process.env.PRIVATE_KEY, (err, decoded) => {
      if (decoded && decoded.email && decoded.password && (!admin || decoded.admin)) {
        User.findAll({
          where: {
            email: decoded.email,
            password: decoded.password
          }
        })
          .then(user => {
            if (user.length <= 0) {
              reportNotLoggedUser(res, admin);
            } else {
              next();
            }
          })
          .catch(error => res.status(400).send(error));
      } else {
        reportNotLoggedUser(res, admin);
      }
    });
  } else {
    reportNotLoggedUser(res, admin);
  }
};

module.exports = { reportNotLoggedUser, checkIfUserIsLogged };
