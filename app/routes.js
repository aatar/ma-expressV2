// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const { listAlbums, listPhotos } = require('./controllers/album');
const { addUser, addAdmin, deleteAll: deleteUsers, login, list: listUsers } = require('./controllers/user');
const {
  add: addUserMiddleware,
  login: loginMiddleware,
  checkIfUserIsLogged,
  checkIfUserIsAdmin
} = require('./middlewares/user');

exports.init = app => {
  app.get('/', (req, res) => res.status(200).send('Welcome!!!'));
  app.get('/health', healthCheck);
  app.get('/albums', listAlbums);
  app.get('/albums/:id/photos', listPhotos);
  app.get('/users', checkIfUserIsLogged, listUsers);
  app.post('/users', addUserMiddleware, addUser);
  app.post('/admin/users', addUserMiddleware, checkIfUserIsAdmin, addAdmin);
  app.delete('/users', deleteUsers);
  app.post('/users/sessions', loginMiddleware, login);
};
