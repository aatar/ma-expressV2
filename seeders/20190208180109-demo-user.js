'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        firstName: 'John',
        lastName: 'Doe',
        email: 'demo@demo.com',
        createdAt: '01-01-2019',
        updatedAt: '01-01-2019'
      },
      {
        firstName: 'John2',
        lastName: 'Doe2',
        email: 'demo2@demo.com',
        createdAt: '01-01-2019',
        updatedAt: '01-01-2019'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
