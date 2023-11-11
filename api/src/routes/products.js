const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController");
const authMiddleware = require("../middlewares/authMiddleWare");

// Route to get all products
router.get("/", productsController.getAllProducts);

// Route to get a specific product by ID
router.get("/:id", productsController.getProductById);

// Route to add a new product
router.post("/", authMiddleware, productsController.createProduct);

// Route to edit an existing product
router.put("/:id", authMiddleware, productsController.editProduct);

module.exports = router;
