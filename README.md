# Trade History API

A simple REST API for simulating trade history using Node.js and Express. This API provides endpoints to retrieve and add trades, with in-memory storage.

## Features

- **GET /trades**: Retrieve all trades in JSON format
- **POST /trade**: Add new trades to the system
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Unit Tests**: Comprehensive test coverage with Jest and Supertest
- **In-memory Storage**: No database required for simple simulations

## Installation

1. Clone the repository:
```bash
git clone https://github.com/GH0ST-141/-Trade-History-API.git
cd -Trade-History-API
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`

## Usage

### API Endpoints

#### Get All Trades
```http
GET /trades
```

**Response:**
```json
[
  {
    "id": 1,
    "pair": "BTC-USDT",
    "price": 60000,
    "amount": 0.5,
    "side": "buy"
  },
  {
    "id": 2,
    "pair": "ETH-USDT",
    "price": 4000,
    "amount": 1.0,
    "side": "sell"
  }
]
```

#### Add a New Trade
```http
POST /trade
Content-Type: application/json

{
  "id": 3,
  "pair": "BTC-USDT",
  "price": 61000,
  "amount": 0.5,
  "side": "buy"
}
```

**Response:**
```json
{
  "message": "Trade added successfully",
  "trade": {
    "id": 3,
    "pair": "BTC-USDT",
    "price": 61000,
    "amount": 0.5,
    "side": "buy"
  }
}
```

### API Documentation

Visit `http://localhost:3000/api-docs` for interactive API documentation powered by Swagger UI.

## Testing

Run the test suite:
```bash
npm test
```

Tests include:
- Retrieving all trades
- Adding new trades
- Input validation

## Deployment

### Render
1. Push code to GitHub
2. Connect Render to your repository
3. Create a new Web Service with:
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: (leave empty)

### Vercel
1. Create an `api` folder
2. Move server code to `api/index.js`
3. Export the Express app
4. Deploy with `vercel` CLI

## Project Structure

```
-Trade-History-API/
├── server.js          # Main server file
├── server.test.js     # Unit tests
├── package.json       # Dependencies and scripts
├── README.md          # This file
└── node_modules/      # Dependencies
```

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **Swagger/OpenAPI**: API documentation
- **Jest**: Testing framework
- **Supertest**: HTTP endpoint testing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

ISC License - see LICENSE file for details