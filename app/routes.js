const { healthCheck } = require('./controllers/healthCheck');
const { listAlbums, listPhotos } = require('./controllers/album');
const { addUser, addAdmin, login, list: listUsers } = require('./controllers/user');
const { validateSchema } = require('./middlewares/common');
const { checkIfUserIsLogged, checkIfUserIsAdmin } = require('./middlewares/user');
const schemas = require('./schemas');

exports.init = app => {
  app.get('/', (req, res) => res.send('Welcome to Heroku'));
  app.get('/health', healthCheck);
  app.get('/albums', listAlbums);
  app.get('/albums/:id/photos', listPhotos);
  app.post('/users', [validateSchema(schemas.userSignUp)], addUser);
  app.post('/users/sessions', [validateSchema(schemas.userSignIn)], login);
  app.get('/users', [checkIfUserIsLogged], listUsers);
  app.post('/admin/users', [checkIfUserIsAdmin], addAdmin);
};
