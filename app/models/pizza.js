'use strict';
module.exports = (sequelize, Sequelize) => {
  const Pizza = sequelize.define(
    'Pizza',
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.STRING, allowNull: false },
      price: { type: Sequelize.DOUBLE, allowNull: false }
    },
    {}
  );
  Pizza.associate = models => {
    Pizza.belongsToMany(models.Order, {
      through: 'PizzaOrder',
      as: 'orders',
      foreignKey: 'pizzaId'
    });
  };
  return Pizza;
};
