const request = require('supertest');
const App = require ('./App');

describe('GET /allproduct', () => {
  it('should get all products', async () => {
    const response = await request(App).get('/allproduct');

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array); // Assuming your API returns an array of products
    // Add more assertions based on the structure of your API response
  });
});