const express = require('express');
const router = express.Router();
const pool = require('../db-connection'); // Import the pool

// GET /api/shipments
router.get('/',  async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM shipment');
    res.json(result.rows);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// GET /api/shipments/:id
router.get('/:id',  async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM shipment WHERE shipment_id = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// POST /api/shipments
router.post('/',  async (req, res) => {
  const { order_id, shipment_date, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO shipment (order_id, shipment_date, status) VALUES ($1, $2, $3) RETURNING *',
      [order_id, shipment_date, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// PUT /api/shipments/:id
router.put('/:id', async (req, res) => {
  const { order_id, shipment_date, status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE shipment SET order_id = $1, shipment_date = $2, status = $3, updated_at = NOW() WHERE shipment_id = $4 RETURNING *',
      [order_id, shipment_date, status, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE /api/shipments/:id
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM shipment WHERE shipment_id = $1', [req.params.id]);
    res.status(204).send();
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;