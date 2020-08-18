const {
  getPeriodicGoogleNews,
  getInfobaeNews,
  getClarinNews,
  getLaNacionNews,
  getGoogleNews,
  getLastPubdate,
  getMedia
} = require('./controllers/googleNews');

exports.init = app => {
  app.get('/', (req, res) => res.send('Welcome to Heroku'));
  app.post('/google-news', getPeriodicGoogleNews);
  app.get('/google-news', getGoogleNews);
  app.get('/infobae-news', getInfobaeNews);
  app.get('/news-last-pubDate', getLastPubdate);
  app.get('/clarin-news', getClarinNews);
  app.get('/media', getMedia);
  app.get('/lanacion-news', getLaNacionNews);
};
