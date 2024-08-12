const express = require('express');
const router = express.Router();
const pool = require('../db-connection'); // Import the pool

// GET /api/customers
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customer');
    res.json(result.rows);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// GET /api/customers/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customer WHERE customer_id = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// POST /api/customers
router.post('/', async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO customer (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
      [name, email, phone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// PUT /api/customers/:id
router.put('/:id', async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const result = await pool.query(
      'UPDATE customer SET name = $1, email = $2, phone = $3, updated_at = NOW() WHERE customer_id = $4 RETURNING *',
      [name, email, phone, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE /api/customers/:id
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM customer WHERE customer_id = $1', [req.params.id]);
    res.status(204).send();
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;