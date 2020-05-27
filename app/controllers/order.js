const logger = require('../logger'),
  { Order, PizzaOrder } = require('../models');

exports.addOrder = (req, res, next) => {
  const { fullName, contactNumber, deliveryAddress, pizzaId, quantity } = req.query;
  if (fullName && contactNumber && deliveryAddress && pizzaId && quantity) {
    if (pizzaId.length !== quantity.length) {
      return res.status(400).send('PizzaId length must be equals to quantity length');
    }
    logger.info('Creating order...');
    return Order.create({
      fullName,
      contactNumber,
      deliveryAddress
    })
      .then(async createdOrder => {
        for (let i = 0; i < pizzaId.length; i++) {
          await PizzaOrder.create({
            pizzaId: pizzaId[i],
            orderId: createdOrder.id,
            quantity: quantity[i]
          });
        }
        return res.send('OK');
      })
      .catch(next);
  }
  logger.info('Incomplete data');
  return res.status(400).send('Incomplete data');
};
