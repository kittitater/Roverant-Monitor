const express = require('express');
const router = express.Router();
const pool = require('../db-connection');

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE product_id = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST /api/products
router.post('/', async (req, res) => {
  const { product_name, product_description, price } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (product_name, product_description, price) VALUES ($1, $2, $3) RETURNING *',
      [product_name, product_description, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// PUT /api/products/:id
router.put('/:id', async (req, res) => {
  const { product_name, product_description, price } = req.body;
  try {
    const result = await pool.query(
      'UPDATE products SET product_name = $1, product_description = $2, price = $3, updated_at = NOW() WHERE product_id = $4 RETURNING *',
      [product_name, product_description, price, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM products WHERE product_id = $1', [req.params.id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;