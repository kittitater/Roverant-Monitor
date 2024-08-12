const express = require('express');
const router = express.Router();
const pool = require('../db-connection'); // Import the pool


// GET /api/locations
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM location');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET /api/locations/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM location WHERE location_id = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST /api/locations
router.post('/', async (req, res) => {
  const { location_name, location_address } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO location (location_name, location_address) VALUES ($1, $2) RETURNING *',
      [location_name, location_address]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// PUT /api/locations/:id
router.put('/:id', async (req, res) => {
  const { location_name, location_address } = req.body;
  try {
    const result = await pool.query(
      'UPDATE location SET location_name = $1, location_address = $2, updated_at = NOW() WHERE location_id = $3 RETURNING *',
      [location_name, location_address, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// DELETE /api/locations/:id
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM location WHERE location_id = $1', [req.params.id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;