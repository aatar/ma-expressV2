const request = require('supertest');
const app = require('../app');

describe('GET /pizzas', () => {
  test('should list pizzas', async () => {
    const response = await request(app).get('/pizzas');
    expect(response.statusCode).toBe(200);
  });
});
