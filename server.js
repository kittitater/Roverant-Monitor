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
const authRoute = require('./routes/auth-routes.js');
const categoryRoute = require('./routes/category.js');
const productRoute = require('./routes/product.js');
const inventoryRoute = require('./routes/inventory.js');
const warehouseRoute = require('./routes/warehouse.js');
const locationRoute = require('./routes/location.js');
const itemRoute = require('./routes/item.js');
const supplierRoute = require('./routes/supplier.js');
const itemSupplierRoute = require('./routes/item_supplier.js');
const customerRoute = require('./routes/customer');
const orderRoute = require('./routes/order');
const orderItemRoute = require('./routes/order_item');
const shipmentRoute = require('./routes/shipment');
const userRoute = require('./routes/user');

// Path to API
app.use('/api/item', itemRoute);
app.use('/api/auth', authRoute);
app.use('/api/category', categoryRoute); 
app.use('/api/supplier', supplierRoute);
    app.use('/api/product', productRoute); 
app.use('/api/inventory', inventoryRoute);
app.use('/api/warehouse', warehouseRoute);
app.use('/api/location', locationRoute);
app.use('/api/item_supplier', itemSupplierRoute);
app.use('/api/customer', customerRoute);
app.use('/api/order', orderRoute);
app.use('/api/order_item', orderItemRoute);
app.use('/api/shipment', shipmentRoute);
app.use('/api/user', userRoute);

// Error handling middleware
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});