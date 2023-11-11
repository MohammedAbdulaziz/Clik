const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    storageCapacity: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    mainImageUrl: {
        type: String,
        required: true,
    },
    imageUrls: {
        type: [String],
        required: true,
    },
    inStock: {
        type: Boolean,
        required: true,
    },
    availableQuantity: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product, productSchema };
