const { getPizzas, addPizza } = require('./controllers/pizza');
const { addOrder } = require('./controllers/order');

exports.init = app => {
  app.get('/pizzas', getPizzas);
  app.post('/pizzas', addPizza);
  app.post('/orders', addOrder);
};
