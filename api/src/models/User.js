const mongoose = require('mongoose');

const Order = require('./Order');
const Product = require('./Product');
const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    zipcode: String
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: addressSchema,
    phoneNumber: String,
    orders: [Order.orderSchema],
    wishlist: [Product.productSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
