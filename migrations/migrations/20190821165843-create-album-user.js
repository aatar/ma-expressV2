'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .createTable('Album_users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        album_id: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        album_title: {
          allowNull: false,
          type: Sequelize.STRING
        },
        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
      .then(() =>
        queryInterface.addIndex('Album_users', {
          fields: ['album_id', 'user_id'],
          unique: true
        })
      )
      .catch(error => {
        throw error;
      }),
  down: queryInterface => queryInterface.dropTable('Album_users')
};
