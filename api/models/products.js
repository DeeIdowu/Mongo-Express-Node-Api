const mongoose = require('mongoose');

//Creation of schema
const productSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    price: Number
});

//exporting the product and product schema

module.exports = mongoose.model('Product', productSchema);