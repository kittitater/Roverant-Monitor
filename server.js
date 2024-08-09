const express = require('express');
const cors = require('cors');

// Initialize Express app
const app = express();
const port = process.env.PORT || 3001;
const hostname = process.env.HOSTNAME || 'localhost';

// Middleware
app.use(cors());
app.use(express.json());

// Path to file routes
const itemsRoute = require('./routes/items');
const authRoute = require('./routes/auth-routes');
const categoriesRoute = require('./routes/category');
const suppliersRoute = require('./routes/suppliers');
const productsRoute = require('./routes/products');
const inventoryRoute = require('./routes/inventory');

// Path to API
app.use('/api/items', itemsRoute);
app.use('/api/auth', authRoute);
app.use('/api/categories', categoriesRoute);
app.use('/api/suppliers', suppliersRoute);
app.use('/api/products', productsRoute);
app.use('/api/inventory', inventoryRoute);

// Error handling middleware
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});