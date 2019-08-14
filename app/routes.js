// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const { listAlbums, listPhotos } = require('./controllers/album');
const { add: addUser, deleteAll: deleteUsers, login, list: listUsers } = require('./controllers/user');
const { add: addUserMiddleware, login: loginMiddleware, checkIfUserIsLogged } = require('./middlewares/user');

exports.init = app => {
  app.get('/', (req, res) => res.status(200).send('Welcome!!'));
  app.get('/health', healthCheck);
  app.get('/albums', listAlbums);
  app.get('/albums/:id/photos', listPhotos);
  app.get('/users', checkIfUserIsLogged, listUsers);
  app.post('/users', addUserMiddleware, addUser);
  app.delete('/users', deleteUsers);
  app.post('/users/sessions', loginMiddleware, login);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
