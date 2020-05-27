const request = require('supertest');
const app = require('../app');

describe('POST /orders', () => {
  test('arguments missing', async () => {
    const response = await request(app).post(
      '/orders?fullName=Ariel&contactNumber=12345&pizzaId=1&quantity=3'
    );
    expect(response.statusCode).toBe(422);
  });

  test('PizzaId length must be equals to quantity length', async () => {
    const response = await request(app).post(
      '/orders?fullName=Ariel&contactNumber=12345&deliveryAddress=myStreet&pizzaId=1&quantity=3&pizzaId=2'
    );
    expect(response.statusCode).toBe(400);
  });

  test('should create order', async () => {
    const response = await request(app).post(
      '/orders?fullName=Ariel&contactNumber=12345&deliveryAddress=myStreet&pizzaId=1&quantity=3&pizzaId=2&quantity=1'
    );
    expect(response.statusCode).toBe(201);
  });
});
