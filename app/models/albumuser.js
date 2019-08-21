'use strict';
module.exports = (sequelize, DataTypes) => {
  const AlbumUser = sequelize.define(
    'AlbumUser',
    {
      album_id: DataTypes.INTEGER,
      album_title: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER
    },
    {}
  );
  AlbumUser.associate = models => {
    AlbumUser.belongsTo(models.User);
  };
  return AlbumUser;
};
