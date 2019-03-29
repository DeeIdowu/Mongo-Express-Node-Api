//Required dependencies
const express = require('express');
const app = express();
const morgan = require('morgan');

//import of /products endpoint route:
const productRoutes = require('./api/routes/products');
//import of /orders endpoint route:
const orderRoutes = require('./api/routes/orders');

//to initalize the use of morgan:
app.use(morgan('dev'));
//setting up middleware for incoming request
//setting up filter for requests starting with /products and handler of arguements via ProductRoutes file
//meaning endpoint url requests via /products will be forwards to products.js file
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//How to handle errors that pass the above middlewares:
app.use((req,res,next) =>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})
//Handle all the errors - for the database usage:
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message //renders 'Not found'
        }
    })

})

//to export app.js
module.exports = app;

