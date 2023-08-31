const { Op } = require("sequelize");
const { User, ShopingOrder } = require("../models");
const helpers = require('../helpers');

class ControllerProduct {
    static addOrder(req, res) {
        const userId = req.param.id;

        User.findByPk(userId);
        ShopingOrder.create({
            orderNumber: generateOrderNumber(),
            amount: req.body.amount,
            quantity: req.body.quantity,
            orderDate: new Date(),
            UserId: user.id,
            ProductId: req.body.productId,
        })
            .then(createdOrder => {
                res.redirect('/home', { order })
            })
            .catch((err) => {
                console.log(err);
                res.send(err);
            });
    }

    static updateOrder(req, res) {
        const userId = req.params.id;
        const productId = req.body.productId;
        const quantity = req.body.quantity;

        User.findByPk(userId)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }

                ShopingOrder.findOrCreate({
                    where: { UserId: user.id },
                })
                    .then(([cart]) => {
                        ShopingOrder.create({
                            orderNumber: generateOrderNumber(),
                            amount: helpers.calculateOrderAmount(productId, quantity),
                            quantity: quantity,
                            orderDate: new Date(),
                            UserId: user.id,
                            ProductId: productId,
                            ShoppingCartId: cart.id,
                        })
                            .then(createdOrder => {
                                res.status(201).json({ message: 'Order created successfully', order: createdOrder });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({ error: 'Failed to create order' });
                            });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error: 'Failed to find or create shopping cart' });
                    });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: 'Failed to find user' });
            });
    }
}

module.exports = ControllerProduct;
