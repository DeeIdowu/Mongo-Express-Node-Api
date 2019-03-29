//Required dependencies
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//call mongoose
mongoose.connect('mongodb+srv://Node-Shop-Admin:' + process.env.MONGO_ATLAS_PW '@node-rest-shop-ttkb2.mongodb.net/test?retryWrites=true', 
{
   //making mongodb client work:
   useMongoClient: true 
}
);

//import of /products endpoint route:
const productRoutes = require('./api/routes/products');
//import of /orders endpoint route:
const orderRoutes = require('./api/routes/orders');

//to initalize the use of morgan:
app.use(morgan('dev'));

//to intialize the user of body-parser and what kind of body to parse:
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json({}));
//with bodyParser we can parse incoming products via get requests

//middleware for CORS:
app.use((req, res, next) => {
    //adding headers to responses, second quotation is the value/access for client url '*' due to no specific link:
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    //options request sent whenever post request is made therefore is request method is absolutely equal to options:
    if(req.method === 'OPTIONS') {
        //providing access to these methods:
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET' )
        return res.status(200).json({});
    }
    //if not returning immeditately
    next();

});



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

