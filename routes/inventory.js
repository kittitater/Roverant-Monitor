const express = require('express');
const router = express.Router();
const pool = require('../db-connection');

// Get all inventory items
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventory');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific inventory item
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM inventory WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new inventory item
router.post('/', async (req, res) => {
    try {
        const { name, quantity } = req.body;
        const result = await pool.query('INSERT INTO inventory (name, quantity) VALUES ($1, $2) RETURNING *', [name, quantity]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an existing inventory item
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, quantity } = req.body;
        const result = await pool.query('UPDATE inventory SET name = $1, quantity = $2 WHERE id = $3 RETURNING *', [name, quantity, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an inventory item
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM inventory WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;