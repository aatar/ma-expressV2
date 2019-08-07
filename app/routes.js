// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const { listAlbums } = require('./controllers/album');

exports.init = app => {
  app.get('/', (req, res) => res.status(200).send('Welcome!!'));
  app.get('/health', healthCheck);
  app.get('/albums', listAlbums);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
