const shippingPrice = 50;

function calculateSubtotal(products) {
    let subtotal = 0;
    products.forEach((product) => {
        subtotal += product.productId.price * product.quantity;
    });
    console.log(`Subtotal: ${subtotal}`);
    return subtotal;
}

function calculateTotalPrice(subtotal) {
    const tax = subtotal * 0.14;
    const totalPrice = subtotal + tax + shippingPrice;
    return { totalPrice, tax };
}

module.exports = { calculateTotalPrice, calculateSubtotal, shippingPrice };
