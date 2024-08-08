const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const secretKey = 'your_secret_key'; // Replace with your secret key

// Function to hash a password
const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    throw new Error('Error hashing password');
  }
};

// Function to compare a plain text password with a hashed password
const comparePassword = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (err) {
    throw new Error('Error comparing password');
  }
};

// Function to generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
};

module.exports = { hashPassword, comparePassword, generateToken };