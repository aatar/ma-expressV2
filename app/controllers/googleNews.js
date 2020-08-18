const { getNews } = require('../services/googleNews'),
  logger = require('../logger'),
  schedule = require('node-schedule'),
  { GoogleNews } = require('../models');

const { MEDIA } = require('./constants');

exports.getMedia = (req, res) => res.send(MEDIA);

exports.getLastPubdate = (req, res, next) => {
  if (!req.query.link) {
    return res.status(400).send('Link is missing');
  }
  logger.info('Getting last date...');
  return getNews([req.query.link])
    .then(response => res.send(response.items[0].pubDate))
    .catch(next);
};

exports.getInfobaeNews = (req, res, next) => {
  logger.info('Getting Infobae news...');
  return getNews(['https://www.infobae.com/feeds/rss/', 'https://www.infobae.com/feeds/rss/'])
    .then(response => {
      let ans = [];
      // eslint-disable-next-line array-callback-return
      response.items.map(item => {
        const { title, link, pubDate, content } = item;
        ans = [...ans, { title, link, pubDate, content }];
      });
      return res.send(ans);
    })
    .catch(next);
};

exports.getClarinNews = (req, res, next) => {
  logger.info('Getting Clarin news...');
  return getNews(['https://www.clarin.com/rss/politica/'])
    .then(response => {
      let ans = [];
      // eslint-disable-next-line array-callback-return
      response.items.map(item => {
        const { title, link, pubDate, content } = item;
        ans = [...ans, { title, link, pubDate, content }];
      });
      return res.send(ans);
    })
    .catch(next);
};

exports.getLaNacionNews = (req, res, next) => {
  logger.info('Getting La Nacion news...');
  return getNews(['http://contenidos.lanacion.com.ar/herramientas/rss-categoria_id=30'])
    .then(response => {
      let ans = [];
      // eslint-disable-next-line array-callback-return
      response.items.map(item => {
        const { title, link, pubDate, content } = item;
        ans = [...ans, { title, link, pubDate, content }];
      });
      return res.send(ans);
    })
    .catch(next);
};

exports.getPeriodicGoogleNews = (req, res, next) => {
  schedule.scheduleJob('0 * * * *', () => {
    logger.info('Getting Google news...');
    return getNews([
      // eslint-disable-next-line max-len
      'https://news.google.com/rss/topics/CAAqKAgKIiJDQkFTRXdvSkwyMHZNREZqY0hsNUVnWmxjeTAwTVRrb0FBUAE?hl=es-419&gl=AR&ceid=AR%3Aes-419'
    ])
      .then(response => {
        response.items.map(async item => {
          const news = await GoogleNews.findOne({
            where: {
              link: item.link
            }
          });
          if (!news) {
            const { title, link, pubDate, content } = item;
            const source = title.split(' - ');
            await GoogleNews.create({
              title,
              link,
              pubDate,
              content,
              source: source[source.length - 1]
            });
          }
        });
        return res.send('OK');
      })
      .catch(next);
  });
  return res.send('Schedule created!');
};

exports.getGoogleNews = (req, res, next) => {
  logger.info('Getting news...');
  return GoogleNews.findAll()
    .then(response => {
      logger.info('Google news found');
      return res.send(response);
    })
    .catch(next);
};
