const express = require('express');
const router = express.Router();
const pool = require('../db-connection');

// Get all suppliers
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM suppliers');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific supplier
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM suppliers WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Supplier not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new supplier
router.post('/', async (req, res) => {
    try {
        const { name, address, phone } = req.body;
        const result = await pool.query(
            'INSERT INTO suppliers (name, address, phone) VALUES ($1, $2, $3) RETURNING *',
            [name, address, phone]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a supplier
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, phone } = req.body;
        const result = await pool.query(
            'UPDATE suppliers SET name = $1, address = $2, phone = $3 WHERE id = $4 RETURNING *',
            [name, address, phone, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Supplier not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a supplier
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM suppliers WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Supplier not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;