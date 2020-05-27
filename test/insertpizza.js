const request = require('supertest');
const app = require('../app');

describe('POST /pizzas', () => {
  test('arguments missing', async () => {
    const response = await request(app)
      .post('/pizzas')
      .send({ name: 'MyPizzaName', price: 11 })
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(422);
  });

  test('should create pizza', async () => {
    const response = await request(app)
      .post('/pizzas')
      .send({ name: 'MyPizzaName', description: 'This is the description of the pizza', price: 11 })
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(201);
  });
});
