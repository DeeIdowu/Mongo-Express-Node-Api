const express = require('express');
const router = express.Router();

//to register different routes, 
//this is for the /products endpoint via GET and Post Routes

//this is the get request via /products url this is only '/' due to exporting to app.js

router.get('/', (req,res,next) => {
    res.status(200).json({
        message: 'Handling get requests'
    });
});

//handle post requests

router.post('/', (req,res,next) => {
    res.status(200).json({
        message: 'Handling  post requests'
    });
});

//export the file
module.exports = router;