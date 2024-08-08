const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

// Initialize Express app
const app = express();
const port = process.env.PORT || 3001;

// Configure PostgreSQL connection
const pool = new Pool({
  user: 's_lphithatsanan',      // replace with your PostgreSQL username
  host: 'localhost',
  database: 'myapp',
  password: 'Home#2002',  // replace with your PostgreSQL password
  port: 5432,
});

// Middleware
app.use(cors());
app.use(express.json());



// path to file route
const itemsRoute = require('./routes/items')

// path to API
app.use('/api/itmes',itemsRoute)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});