const express = require('express');
const router = express.Router();


// Route to get items from database
app.get('/api/items', async (res) => {
    try {
      const result = await pool.query('SELECT * FROM items');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  module.exports = router;