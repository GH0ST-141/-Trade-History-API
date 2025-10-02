const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Trade History API',
      version: '1.0.0',
      description: 'A simple API to simulate trade history',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./server.js'], // Path to the API docs
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// In-memory array to store trades
let trades = [
  { id: 1, pair: 'BTC-USDT', price: 60000, amount: 0.5, side: 'buy' },
  { id: 2, pair: 'ETH-USDT', price: 4000, amount: 1.0, side: 'sell' },
  { id: 3, pair: 'BTC-USDT', price: 61000, amount: 0.3, side: 'buy' }
];

/**
 * @swagger
 * /trades:
 *   get:
 *     summary: Retrieve all trades
 *     description: Get a list of all trades stored in memory
 *     responses:
 *       200:
 *         description: A list of trades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   pair:
 *                     type: string
 *                     example: "BTC-USDT"
 *                   price:
 *                     type: number
 *                     example: 60000
 *                   amount:
 *                     type: number
 *                     example: 0.5
 *                   side:
 *                     type: string
 *                     example: "buy"
 */
app.get('/trades', (req, res) => {
  res.json(trades);
});

/**
 * @swagger
 * /trade:
 *   post:
 *     summary: Add a new trade
 *     description: Add a new trade to the in-memory storage
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - pair
 *               - price
 *               - amount
 *               - side
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               pair:
 *                 type: string
 *                 example: "BTC-USDT"
 *               price:
 *                 type: number
 *                 example: 61000
 *               amount:
 *                 type: number
 *                 example: 0.5
 *               side:
 *                 type: string
 *                 enum:
 *                   - buy
 *                   - sell
 *                 example: "buy"
 *     responses:
 *       201:
 *         description: Trade added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Trade added successfully"
 *                 trade:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     pair:
 *                       type: string
 *                       example: "BTC-USDT"
 *                     price:
 *                       type: number
 *                       example: 61000
 *                     amount:
 *                       type: number
 *                       example: 0.5
 *                     side:
 *                       type: string
 *                       example: "buy"
 *       400:
 *         description: Bad request
 */
app.post('/trade', (req, res) => {
  const trade = req.body;
  // Optionally, add validation here
  trades.push(trade);
  res.status(201).json({ message: 'Trade added successfully', trade });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});