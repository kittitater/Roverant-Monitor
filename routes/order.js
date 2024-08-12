const express = require('express');
const router = express.Router();
const pool = require('../db-connection'); // Import the pool

// GET /api/orders
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "order"');
    res.json(result.rows);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// GET /api/orders/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "order" WHERE order_id = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// POST /api/orders
router.post('/', async (req, res) => {
  const { customer_id, order_date, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO "order" (customer_id, order_date, status) VALUES ($1, $2, $3) RETURNING *',
      [customer_id, order_date, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// PUT /api/orders/:id
router.put('/:id', async (req, res) => {
  const { customer_id, order_date, status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE "order" SET customer_id = $1, order_date = $2, status = $3, updated_at = NOW() WHERE order_id = $4 RETURNING *',
      [customer_id, order_date, status, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE /api/orders/:id
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM "order" WHERE order_id = $1', [req.params.id]);
    res.status(204).send();
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;