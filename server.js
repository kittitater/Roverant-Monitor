const express = require('express');
const cors = require('cors');

// Initialize Express app
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Path to file routes
const itemsRoute = require('./routes/items');
const authRoute = require('./routes/auth-routes');

// Path to API
app.use('/api/items', itemsRoute);
app.use('/api/auth', authRoute);

// Error handling middleware
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});