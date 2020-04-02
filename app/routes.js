const { healthCheck } = require('./controllers/healthCheck');
const { listAlbums, listBoughtAlbums, listPhotos, buyAlbum } = require('./controllers/album');
const { addUser, addAdmin, login, list: listUsers, invalidateSessions } = require('./controllers/user');
const { uploadVideo } = require('./controllers/media');
const { getPeriodicGoogleNews, getGoogleNews } = require('./controllers/googleNews');
const { validateSchema } = require('./middlewares/common');
const { checkIfUserIsLogged, checkIfUserHasAccess, checkIfUserIsAdmin } = require('./middlewares/user');
const { checkIfUserBoughtAlbum, checkIfUserDidntBuyAlbum } = require('./middlewares/album');
const schemas = require('./schemas');

exports.init = app => {
  app.get('/', (req, res) => res.send('Welcome to Heroku'));
  app.post('/google-news', getPeriodicGoogleNews);
  app.get('/google-news', getGoogleNews);
  app.get('/upload-video', uploadVideo);
  app.get('/health', healthCheck);
  app.get('/albums', listAlbums);
  app.post('/albums/:id', [checkIfUserIsLogged, checkIfUserDidntBuyAlbum], buyAlbum);
  app.get('/albums/:id/photos', listPhotos);
  app.post('/users', [validateSchema(schemas.userSignUp)], addUser);
  app.post('/users/sessions', [validateSchema(schemas.userSignIn)], login);
  app.get('/users', [checkIfUserIsLogged], listUsers);
  app.post('/admin/users', [checkIfUserIsAdmin], addAdmin);
  app.get('/users/:id/albums', [checkIfUserIsLogged, checkIfUserHasAccess], listBoughtAlbums);
  app.get('/users/albums/:id/photos', [checkIfUserIsLogged, checkIfUserBoughtAlbum], listPhotos);
  app.post('/users/sessions/invalidate_all', [checkIfUserIsLogged], invalidateSessions);
};
