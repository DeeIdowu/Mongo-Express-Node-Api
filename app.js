const express = require('express');
const app = express();

//import of /products endpoint route:
const productRoutes = require('./api/routes/products');
//import of /orders endpoint route:
const orderRoutes = require('./api/routes/orders');

//setting up middleware for incoming request
//setting up filter for requests starting with /products and handler of arguements via ProductRoutes file
//meaning endpoint url requests via /products will be forwards to products.js file
app.use('/products', productRoutes);
app.use('/order', orderRoutes);

//to export app.js
module.exports = app;

