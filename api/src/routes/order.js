const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const isAuthenticated = require("../middlewares/authMiddleWare");

// GET all orders
router.get("/", isAuthenticated, orderController.getAllOrders);

// GET a specific order by ID
router.get("/:orderId", isAuthenticated, orderController.getOrder);

// POST a new order
router.post("/", isAuthenticated, orderController.createOrder);

// POST a new order from cart
router.post("/cart", isAuthenticated, orderController.createOrderFromCart);

// PUT (update) an existing order by ID
router.put("/:orderId", isAuthenticated, orderController.editOrder);

// cancel an existing order by ID
router.patch("/:orderId", isAuthenticated, orderController.cancelOrder);

// Export the router
module.exports = router;
