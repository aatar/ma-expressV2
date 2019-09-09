'use strict';
module.exports = (sequelize, Sequelize) => {
  const AlbumUser = sequelize.define(
    'AlbumUser',
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
      album_id: { type: Sequelize.INTEGER, allowNull: false },
      album_title: { type: Sequelize.STRING, allowNull: false },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['album_id', 'user_id']
        }
      ]
    }
  );
  AlbumUser.associate = models => {
    AlbumUser.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };
  return AlbumUser;
};
