const express = require('express');
const router = express.Router();

//Geting the order
router.get('/', (req,res,next) => {
    res.status(200).json({
        message: 'Order fetched'
    });
});

//Submitting an order
router.post('/', (req,res, next) => {
    res.status.json(201).json({
        message: 'Order created'
    });
});

//Getting order via ID:
router.get('/:orderId', (req,res, next) => {
    res.status.json(200).json({
        message: 'Order details',
        orderId: req.params.orderId
    });
});

//Deleting:
router.delete('/:orderId', (req,res, next) => {
    res.status.json(200).json({
        message: 'Order deleted',
        orderId: req.params.orderId
    });
});


//export
module.exports = router;