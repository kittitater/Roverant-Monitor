const express = require('express');
const router = express.Router();
const pool = require('../db-connection'); // Import the pool

// GET /api/order_items
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM order_item');
    res.json(result.rows);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// GET /api/order_items/:id
router.get('/:id',  async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM order_item WHERE order_item_id = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// POST /api/order_items
router.post('/', async (req, res) => {
  const { order_id, product_id, quantity, price } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO order_item (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [order_id, product_id, quantity, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// PUT /api/order_items/:id
router.put('/:id', async (req, res) => {
  const { order_id, product_id, quantity, price } = req.body;
  try {
    const result = await pool.query(
      'UPDATE order_item SET order_id = $1, product_id = $2, quantity = $3, price = $4, updated_at = NOW() WHERE order_item_id = $5 RETURNING *',
      [order_id, product_id, quantity, price, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE /api/order_items/:id
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM order_item WHERE order_item_id = $1', [req.params.id]);
    res.status(204).send();
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;