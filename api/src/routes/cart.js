const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middlewares/authMiddleWare");
// Get cart
router.get("/", authMiddleware, cartController.getCart);

// Add product to cart
router.post("/add", authMiddleware, cartController.addToCart);

// Remove product from cart
router.delete(
    "/remove/:productId",
    authMiddleware,
    cartController.removeFromCart
);

// Modify product quantity in cart
router.patch(
    "/modify/:productId",
    authMiddleware,
    cartController.modifyCartQuantity
);

module.exports = router;
