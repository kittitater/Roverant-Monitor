const express = require('express');
const router = express.Router();
const { hashPassword, comparePassword } = require('../auth'); // Import auth functions
const pool = require('../db-connection'); // Import the pool

// Route to register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).send('Server Error');
  }
});

// Route to login a user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    if (user && await comparePassword(password, user.password)) {
      const token = generateToken(user); // Assuming generateToken is defined elsewhere
      res.json({ token });
    } else {
      res.status(400).send('Invalid Credentials');
    }
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;