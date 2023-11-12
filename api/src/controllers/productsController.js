// Import the Product model
const Product = require("../models/Product");

// Function to create a new product
async function createProduct(req, res) {
    try {
        // Create a new product with the request body
        const product = new Product(req.body);
        // Save the product to the database
        await product.save();
        // Return the saved product
        res.status(201).json(product);
    } catch (error) {
        // Handle any errors that occur
        res.status(500).json({ error: error.message });
    }
}

// Function to edit an existing product
async function editProduct(req, res) {
    try {
        // Find the product by ID
        const product = await Product.findById(req.params.id);
        // Update the product with the request body
        Object.assign(product, req.body);
        // Save the updated product to the database
        await product.save();
        // Return the updated product
        res.json(product);
    } catch (error) {
        // Handle any errors that occur
        res.status(500).json({ error: error.message });
    }
}

// Function to get all products
async function getAllProducts(req, res) {
    try {
        // Find all products in the database
        const products = await Product.find();
        // Return the products
        res.json(products);
    } catch (error) {
        // Handle any errors that occur
        res.status(500).json({ error: error.message });
    }
}

// Function to get a single product by ID
async function getProductById(req, res) {
    try {
        // Find the product by ID
        const product = await Product.findById(req.params.id);
        // Return the product
        res.json(product);
    } catch (error) {
        // Handle any errors that occur
        res.status(500).json({ error: error.message });
    }
}

// Export the controller functions
module.exports = {
    createProduct,
    editProduct,
    getAllProducts,
    getProductById,
};
