const express = require('express');
const router = express.Router();
const pool = require('../db-connection'); // Import the pool

// GET /api/items
router.get('/',  async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM item');
    res.json(result.rows);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// GET /api/items/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM item WHERE item_id = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// POST /api/items
router.post('/', async (req, res) => {
  const { item_name, item_description, item_price } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO items (item_name, item_description, item_price) VALUES ($1, $2, $3) RETURNING *',
      [item_name, item_description, item_price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// PUT /api/items/:id
router.put('/:id', async (req, res) => {
  const { item_name, item_description, item_price } = req.body;
  try {
    const result = await pool.query(
      'UPDATE item SET item_name = $1, item_description = $2, item_price = $3, updated_at = NOW() WHERE item_id = $4 RETURNING *',
      [item_name, item_description, item_price, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE /api/items/:id
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM item WHERE item_id = $1', [req.params.id]);
    res.status(204).send();
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;