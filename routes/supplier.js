const express = require('express');
const router = express.Router();
const pool = require('../db-connection'); // Import the pool

// GET /api/suppliers
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM supplier');
    res.json(result.rows);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// GET /api/suppliers/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM supplier WHERE supplier_id = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// POST /api/suppliers
router.post('/', async (req, res) => {
  const { supplier_name, supplier_contact } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO supplier (supplier_name, supplier_contact) VALUES ($1, $2) RETURNING *',
      [supplier_name, supplier_contact]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// PUT /api/suppliers/:id
router.put('/:id', async (req, res) => {
  const { supplier_name, supplier_contact } = req.body;
  try {
    const result = await pool.query(
      'UPDATE supplier SET supplier_name = $1, supplier_contact = $2, updated_at = NOW() WHERE supplier_id = $3 RETURNING *',
      [supplier_name, supplier_contact, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE /api/suppliers/:id
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM supplier WHERE supplier_id = $1', [req.params.id]);
    res.status(204).send();
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;