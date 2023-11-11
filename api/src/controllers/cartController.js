const Cart = require("../models/Cart");

// Get the cart for the current user
async function getCart(req, res) {
    const userId = req.user.userId;

    try {
        const cart = await Cart.findOne({ user: userId }).populate(
            "products.product",
            "name price mainImageUrl"
        );

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

// Add a product to the cart
async function addToCart(req, res) {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;

    try {
        let cart = await Cart.findOne({ user: userId });

        // If cart doesn't exist, create a new one
        if (!cart) {
            cart = new Cart({ user: userId, products: [] });
        }

        // Check if product already exists in cart
        const existingProduct = cart.products.find(
            (product) => product.productId.toString() === productId
        );

        if (existingProduct) {
            // If product already exists, update its quantity
            existingProduct.quantity += quantity;
        } else {
            // If product doesn't exist, add it to the cart
            cart.products.push({ productId: productId, quantity: quantity });
        }

        await cart.save();

        res.status(200).json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

// Remove a product from the cart
async function removeFromCart(req, res) {
    const { productId } = req.params;
    const userId = req.user.userId;

    try {
        const cart = await Cart.findOne({ user: userId });
        // Check if product exists in cart
        const existingProduct = cart.products.findIndex(
            (product) => product.productId.toString() === productId
        );
        console.log(existingProduct);
        if (existingProduct === -1) {
            return res
                .status(404)
                .json({ message: "Product not found in cart" });
        }

        // Remove product from cart
        cart.products.splice(existingProduct, 1);

        await cart.save();

        res.status(200).json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

// Modify the quantity of a product in the cart
async function modifyCartQuantity(req, res) {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;

    try {
        const cart = await Cart.findOne({ user: userId });

        // Check if product exists in cart
        const existingProductIndex = cart.products.findIndex(
            (product) => product.productId.toString() === productId
        );

        if (existingProductIndex === -1) {
            return res
                .status(404)
                .json({ message: "Product not found in cart" });
        }

        // Update product quantity
        cart.products[existingProductIndex].quantity = quantity;

        await cart.save();

        res.status(200).json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = { addToCart, removeFromCart, modifyCartQuantity, getCart };
