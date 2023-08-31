module.exports = {
    calculateOrderAmount: (productId, quantity) => {
        const productPrice = 100;
        return productPrice * quantity;
    },
};
