const Order = require("../models/Order");
const Cart = require("../models/Cart");
const orderService = require("../services/orderService");
const generateOrderNumber = require("../middlewares/orderMiddleWare");
// Create a new order
async function createOrder(req, res) {
    try {
        let order = {
            userId: req.user.userId,
            orderNumber: generateOrderNumber(),
            items: req.body.items,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            paymentStatus: req.body.paymentStatus,
            subtotal: 0,
            total: 0,
            tax: 0,
            shippingCost: 0,
            orderStatus: "Created",
            orderDate: req.body.orderDate,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        order = new Order(order);
        await order.populate("items.productId", "name price mainImageUrl");
        order.subtotal = orderService.calculateSubtotal(order.items);
        const { totalPrice, tax } = orderService.calculateTotalPrice(
            order.subtotal
        );
        order.total = totalPrice;
        order.tax = tax;
        order.shippingCost = orderService.shippingPrice;
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Server error" });
    }
}

async function createOrderFromCart(req, res) {
    const userId = req.user.userId;
    const { shippingAddress, paymentMethod, paymentStatus, orderDate } =
        req.body;

    try {
        const cart = await Cart.findOne({ user: userId }).populate(
            "products.productId",
            "name price mainImageUrl"
        );

        // If cart doesn't exist or is empty, return an error
        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }
        console.log(cart.products);
        const subtotal = orderService.calculateSubtotal(cart.products);
        // Calculate the total price of the items in the cart

        const { totalPrice, tax } = orderService.calculateTotalPrice(subtotal);

        // Create a new order with the items and total price from the cart
        const order = new Order({
            userId: userId,
            orderNumber: generateOrderNumber(),
            items: cart.products.map((product) => ({
                productId: product.productId,
                quantity: product.quantity,
                price: product.price,
            })),
            subtotal: subtotal,
            total: totalPrice,
            tax: tax,
            shippingCost: orderService.shippingPrice,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
            paymentStatus: paymentStatus,
            orderStatus: "Created",
            orderDate: orderDate,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await order.save();

        // Clear the cart
        cart.products = [];
        await cart.save();

        res.status(200).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

// Cancel an order
async function cancelOrder(req, res) {
    try {
        const order = await Order.findOne({ orderNumber: req.params.orderId });
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        order.orderStatus = "Cancelled";
        await order.save();
        res.json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Edit an order
async function editOrder(req, res) {
    try {
        const order = await Order.findOne({ orderNumber: req.params.orderId });
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        if (req.body.items) {
            order.items = req.body.items;
        }
        await order.populate("items.productId", "name price mainImageUrl");
        // Recalculate subtotal and total
        order.subtotal = orderService.calculateSubtotal(order.items);
        const { totalPrice, tax } = orderService.calculateTotalPrice(
            order.subtotal
        );
        order.total = totalPrice;
        order.tax = tax;
        await order.save();
        res.json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Get all orders
async function getAllOrders(req, res) {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Get a single order
async function getOrder(req, res) {
    try {
        const order = await Order.findOne({ orderNumber: req.params.orderId });
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createOrder,
    createOrderFromCart,
    cancelOrder,
    editOrder,
    getAllOrders,
    getOrder,
};
