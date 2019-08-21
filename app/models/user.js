'use strict';
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      surname: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      admin: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }
    },
    {}
  );
  User.associate = models => {
    User.hasMany(models.AlbumUser, {
      foreignKey: 'user_id',
      as: 'albumUsers'
    });
  };
  return User;
};
