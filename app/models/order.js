'use strict';
module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define(
    'Order',
    {
      id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
      fullName: { type: Sequelize.STRING, allowNull: false },
      contactNumber: { type: Sequelize.INTEGER, allowNull: false },
      deliveryAddress: { type: Sequelize.STRING, allowNull: false }
    },
    {}
  );
  Order.associate = models => {
    Order.belongsToMany(models.Pizza, {
      through: 'PizzaOrder',
      as: 'pizzas',
      foreignKey: 'orderId'
    });
  };
  return Order;
};
