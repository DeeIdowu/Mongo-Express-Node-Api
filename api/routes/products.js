const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//to register different routes, 
//this is for the /products endpoint via GET and Post Routes

//this is the get request via /products url this is only '/' due to exporting to app.js

//deriving from Mongoose schema:
const Product = require('../models/products');

router.get('/', (req,res,next) => {
   //to return all objects stored with query operators
   Product.find()
   .exec()
   .then(docs => {
       console.log(docs);
       res.status(200).json(docs);
   })
   .catch(err => {
       console.log(err);
       res.status(500).json({
           error: err
       })
   })
});

//handle post requests

router.post('/', (req,res, next) => {
    //storage of data 
    const product = new Product ({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling  post requests',
           //confirming of product request
           createdProduct: result
        });

    })
    .catch(err => console.log(err));
    res.status(500).json({
        error: err
    })
   
});

//handling get requests for individual ids
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    //utilizing object model Product and findById Method:
Product.findById(id)
.exec()
//grabbing the document and logging via console.log
.then(doc => {
    console.log("From database", doc);
    if(doc){
        res.status(200).json(doc);
    } else {
        res.status(404).json({message: 'No valid ID'});
    }
    //asynchronous promise providing response
    res.status(200).json(doc);
}).catch(err => 
    console.log(err));
    //fixing get requests
    //sending failure response
    res.status(500).json({error : err});
});

//handling patch requests for individual ids:
router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Product updated'
    });
});

//handling delete requests for individual ids:
router.delete('/:productId', (req, res, next) => {
   const id = req.params.productId;
   Product.remove({_id: id})
   .exec()
   .then(result =>{
       res.status(200).json(result);
   })
   .catch(err => {
       console.log(err);
       res.status(500).json({
           error: err
       });
   });
});


//export the file
module.exports = router;