'use strict';
module.exports = (sequelize, Sequelize) => {
  const PizzaOrder = sequelize.define(
    'PizzaOrder',
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
      pizzaId: { type: Sequelize.INTEGER, allowNull: false },
      orderId: { type: Sequelize.INTEGER, allowNull: false },
      quantity: { type: Sequelize.INTEGER, allowNull: false }
    },
    {}
  );
  PizzaOrder.associate = () => {
    // associations can be defined here
  };
  return PizzaOrder;
};
