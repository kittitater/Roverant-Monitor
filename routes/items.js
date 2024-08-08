const express = require('express');
const router = express.Router();
const pool = require('../db-connection'); // Import the pool
const { authenticateToken } = require('../auth'); // Import the auth middleware

// Example protected route that queries the database
router.get('/', authenticateToken, async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    res.json(result.rows);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;