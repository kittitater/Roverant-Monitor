const express = require('express');
const router = express.Router();
const pool = require('../db-connection'); // Import the pool

// GET /api/item_suppliers
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM item_supplier');
    res.json(result.rows);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// GET /api/item_suppliers/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM item_supplier WHERE item_supplier_id = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// POST /api/item_suppliers
router.post('/', async (req, res) => {
  const { item_id, supplier_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO item_supplier (item_id, supplier_id) VALUES ($1, $2) RETURNING *',
      [item_id, supplier_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// PUT /api/item_suppliers/:id
router.put('/:id', async (req, res) => {
  const { item_id, supplier_id } = req.body;
  try {
    const result = await pool.query(
      'UPDATE item_supplier SET item_id = $1, supplier_id = $2, updated_at = NOW() WHERE item_supplier_id = $3 RETURNING *',
      [item_id, supplier_id, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE /api/item_suppliers/:id
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM item_supplier WHERE item_supplier_id = $1', [req.params.id]);
    res.status(204).send();
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;