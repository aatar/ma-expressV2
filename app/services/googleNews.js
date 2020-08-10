const Parser = require('rss-parser');
const parser = new Parser();

exports.getNews = link => parser.parseURL(link);
