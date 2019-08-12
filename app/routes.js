const { healthCheck } = require('./controllers/healthCheck');
const { listAlbums, listPhotos } = require('./controllers/album');
const { addUser, login } = require('./controllers/user');
const { validateSchema } = require('./middlewares/common');
const schemas = require('./schemas');

exports.init = app => {
  app.get('/', (req, res) => res.send('Welcome to Heroku'));
  app.get('/health', healthCheck);
  app.get('/albums', listAlbums);
  app.get('/albums/:id/photos', listPhotos);
  app.post('/users', [validateSchema(schemas.userSignUp)], addUser);
  app.post('/users/sessions', login);
};
