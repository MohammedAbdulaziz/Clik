const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');
const authController = require('../controllers/authenticationController');

// Route to get all products
router.get('/', authController.isAuthenticated, productsController.getAllProducts);

// Route to get a specific product by ID
router.get('/:id', authController.isAuthenticated, productsController.getProductById);

// Route to add a new product
router.post('/', authController.isAuthenticated, productsController.createProduct);

// Route to edit an existing product
router.put('/:id', authController.isAuthenticated, productsController.editProduct);

module.exports = router;

