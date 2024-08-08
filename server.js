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

// Route to get items from database
app.get('/api/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});