const express = require('express');
const router = express.Router();
const pool = require('../db-connection'); // Import the pool

// GET /api/users
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "user"');
    res.json(result.rows);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// GET /api/users/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "user" WHERE user_id = $1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// POST /api/users
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO "user" (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// PUT /api/users/:id
router.put('/:id', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const result = await pool.query(
      'UPDATE "user" SET username = $1, email = $2, password = $3, updated_at = NOW() WHERE user_id = $4 RETURNING *',
      [username, email, password, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM "user" WHERE user_id = $1', [req.params.id]);
    res.status(204).send();
  } catch (err) {
    console.error('Database query error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;