// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const { listAlbums, listPhotos } = require('./controllers/album');
const { add: addUser, deleteAll: deleteUsers } = require('./controllers/user');
const { add: addUserMiddleware } = require('./middlewares/user');

exports.init = app => {
  app.get('/', (req, res) => res.status(200).send('Welcome!!'));
  app.get('/health', healthCheck);
  app.get('/albums', listAlbums);
  app.get('/albums/:id/photos', listPhotos);
  app.post('/users', addUserMiddleware, addUser);
  app.delete('/users', deleteUsers);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
