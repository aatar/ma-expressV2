const { getNews } = require('../services/googleNews'),
  logger = require('../logger'),
  schedule = require('node-schedule'),
  { GoogleNews } = require('../models');

exports.getInfobaeNews = (req, res, next) => {
  logger.info('Getting Infobae news...');
  return getNews('https://www.infobae.com/feeds/rss/')
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
  return getNews('https://www.clarin.com/rss/politica/')
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
    return getNews(
      // eslint-disable-next-line max-len
      'https://news.google.com/rss/topics/CAAqKAgKIiJDQkFTRXdvSkwyMHZNREZqY0hsNUVnWmxjeTAwTVRrb0FBUAE?hl=es-419&gl=AR&ceid=AR%3Aes-419'
    )
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
