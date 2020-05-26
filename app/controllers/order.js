const { Pizza } = require('../models');

exports.addOrder = (req, res, next) => {
  const { name, description, price } = req.body;
  if (name && description && price) {
    return Pizza.create({
      name,
      description,
      price
    })
      .then(createdUser => res.status(201).send(createdUser))
      .catch(next);
  }
  return res.status(400).send('Incomplete data');
};
