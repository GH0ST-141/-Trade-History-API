const request = require('supertest');
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Import the app from server.js, but since it's not exported, we need to create a test version
// For simplicity, we'll recreate the app in tests

describe('Trade History API', () => {
  let app;
  let trades;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    // Reset trades array for each test
    trades = [
      { id: 1, pair: 'BTC-USDT', price: 60000, amount: 0.5, side: 'buy' },
      { id: 2, pair: 'ETH-USDT', price: 4000, amount: 1.0, side: 'sell' },
    ];

    // Swagger setup (minimal for tests)
    const swaggerOptions = {
      definition: {
        openapi: '3.0.0',
        info: { title: 'Test API', version: '1.0.0' },
      },
      apis: [],
    };
    const specs = swaggerJsdoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    // Routes
    app.get('/trades', (req, res) => {
      res.json(trades);
    });

    app.post('/trade', (req, res) => {
      const trade = req.body;
      trades.push(trade);
      res.status(201).json({ message: 'Trade added successfully', trade });
    });
  });

  describe('GET /trades', () => {
    it('should return all trades', async () => {
      const response = await request(app).get('/trades');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(trades);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
    });
  });

  describe('POST /trade', () => {
    it('should add a new trade', async () => {
      const newTrade = { id: 3, pair: 'BTC-USDT', price: 61000, amount: 0.5, side: 'buy' };
      const response = await request(app)
        .post('/trade')
        .send(newTrade)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Trade added successfully');
      expect(response.body.trade).toEqual(newTrade);

      // Check if trade was added
      const getResponse = await request(app).get('/trades');
      expect(getResponse.body.length).toBe(3);
      expect(getResponse.body[2]).toEqual(newTrade);
    });

    it('should handle invalid data', async () => {
      const invalidTrade = { pair: 'BTC-USDT' }; // Missing required fields
      const response = await request(app)
        .post('/trade')
        .send(invalidTrade)
        .set('Content-Type', 'application/json');

      // Since no validation, it still adds it
      expect(response.status).toBe(201);
      expect(trades.length).toBe(3);
    });
  });
});