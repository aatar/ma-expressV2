const { healthCheck } = require('./controllers/healthCheck');
const { listAlbums, listPhotos } = require('./controllers/album');

exports.init = app => {
  app.get('/', (req, res) => res.send('Welcome to Heroku'));
  app.get('/health', healthCheck);
  app.get('/albums', listAlbums);
  app.get('/albums/:id/photos', listPhotos);
};
