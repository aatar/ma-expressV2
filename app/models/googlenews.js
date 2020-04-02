'use strict';
module.exports = (sequelize, Sequelize) => {
  const GoogleNews = sequelize.define(
    'GoogleNews',
    {
      title: { type: Sequelize.STRING, allowNull: false },
      link: { type: Sequelize.STRING, allowNull: false },
      content: { type: Sequelize.STRING, allowNull: false },
      source: { type: Sequelize.STRING, allowNull: false },
      pubDate: { type: Sequelize.DATE }
    },
    {}
  );
  GoogleNews.associate = () => {
    // associations can be defined here
  };
  return GoogleNews;
};
