const express = require('express');
const router = express.Router();
const pool = require('../db-connection'); // Import the pool

// GET /api/warehouses
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM warehouse');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET /api/warehouses/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM warehouse WHERE warehouse_id = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST /api/warehouses
router.post('/', async (req, res) => {
  const { warehouse_name, warehouse_address } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO warehouse (warehouse_name, warehouse_address) VALUES ($1, $2) RETURNING *',
      [warehouse_name, warehouse_address]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// PUT /api/warehouses/:id
router.put('/:id', async (req, res) => {
  const { warehouse_name, warehouse_address } = req.body;
  try {
    const result = await pool.query(
      'UPDATE warehouse SET warehouse_name = $1, warehouse_address = $2, updated_at = NOW() WHERE warehouse_id = $3 RETURNING *',
      [warehouse_name, warehouse_address, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// DELETE /api/warehouses/:id
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM warehouse WHERE warehouse_id = $1', [req.params.id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;