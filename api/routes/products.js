const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//to register different routes, 
//this is for the /products endpoint via GET and Post Routes

//this is the get request via /products url this is only '/' due to exporting to app.js

//deriving from Mongoose schema:
const Product = require('../models/products');

router.get('/', (req,res,next) => {
    //summoning new products
    const product = {
        name: req.body.name,
        price: req.body.price
    }

    //storage of data 
    const Product = new Product ({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price

    });
    //calling special object
    product.save().then(result => {
        console.log(result)
    }) //storing the information in the database
    .catch(err => console.log(err));
    res.status(200).json({
        message: 'Handling get requests',
        //confirming of product request
        createdProduct: product
    });
});

//handle post requests

router.post('/', (req,res,next) => {
    res.status(200).json({
        message: 'Handling  post requests',
    });
});

//handling get requests for individual ids
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special'){
        res.status(200).json({
            message: 'Discovery of new ID',
            //extract and storage of ID
            id: id
        });
    } else {
        res.status(200).json({
            message: 'Passage of ID'
        });
    }
})

//handling patch requests for individual ids:
router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Product updated'
    });
});

//handling delete requests for individual ids:
router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Product deleted'
    });
});


//export the file
module.exports = router;