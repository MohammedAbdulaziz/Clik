const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const isAuthenticated = require("../middlewares/authMiddleWare");
// Get cart
router.get("/", isAuthenticated, cartController.getCart);

// Add product to cart
router.post("/add", isAuthenticated, cartController.addToCart);

// Remove product from cart
router.delete(
    "/remove/:productId",
    isAuthenticated,
    cartController.removeFromCart
);

// Modify product quantity in cart
router.patch(
    "/modify/:productId",
    isAuthenticated,
    cartController.modifyCartQuantity
);

module.exports = router;
