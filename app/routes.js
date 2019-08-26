const { healthCheck } = require('./controllers/healthCheck');
const { listAlbums, listPhotos } = require('./controllers/album');
const { addUser } = require('./controllers/user');
const {
  EMAIL_REGEXP,
  PASSWORD_REGEXP,
  PASSWORD_MIN_LENGTH,
  EMAIL_REGEXP_ERROR,
  PASSWORD_MIN_LENGTH_ERROR,
  PASSWORD_REGEXP_ERROR
} = require('./constants');
const { validateSignupFields } = require('./middlewares/user');
const { check } = require('express-validator');

exports.init = app => {
  app.get('/', (req, res) => res.send('Welcome to Heroku'));
  app.get('/health', healthCheck);
  app.get('/albums', listAlbums);
  app.get('/albums/:id/photos', listPhotos);
  app.post(
    '/users',
    [
      check('email')
        .matches(EMAIL_REGEXP, 'i')
        .withMessage(EMAIL_REGEXP_ERROR),
      check('password')
        .isLength({ min: PASSWORD_MIN_LENGTH })
        .withMessage(PASSWORD_MIN_LENGTH_ERROR)
        .matches(PASSWORD_REGEXP, 'i')
        .withMessage(PASSWORD_REGEXP_ERROR),
      validateSignupFields
    ],
    addUser
  );
};
