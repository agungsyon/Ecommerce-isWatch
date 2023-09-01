const dateFormat = require("../helpers/dateformat");
const { Product, ShopingOrder } = require("../models");
const qrcode = require("qrcode")

class ProductController {
  static addProduct(req, res) {
    const role = req.session.role;

    if (role == "admin") {
      res.render("product/add-product");
    } else {
      res.redirect("/");
    }
  }

  static postProduct(req, res) {
    const { name, description, price, stock, photo } = req.body;
    Product.create({ name, description, price, stock, photo })
      .then((_) => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static buyProduct(req, res) {
    const { id } = req.params;
    const UserId = req.session.userId;
    let quantity = 1;
    Product.findByPk(id)
      .then((product) => {
        const { price, stock } = product;
        let amount = price;
        let ProductId = id;

        return ShopingOrder.create({
          amount,
          quantity,
          ProductId,
          UserId,
        });
      })
      .then((_) => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static cartList(req, res) {
    const UserId = req.session.userId;

    ShopingOrder.findAll({
      where: UserId,
      attributes: ['id', "orderNumber", "amount", "quantity", "orderDate", "UserId", "ProductId"],
      include: Product,
      order: [["orderDate", "ASC"]],
    })
      .then((carts) => {
        console.log(carts);
        res.render("product/cart-list", { carts, dateFormat });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static CancelCart(req, res) {
    const {id} = req.params

    ShopingOrder.destroy({ where: { id } })
    .then((_) => {
        res.redirect("/cart");
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static checkout(req, res) {
    const UserId = req.session.userId;

    ShopingOrder.destroy({ where: { UserId } })
    .then((_) => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static checkoutQrCode(req, res) {
    const {totalAmount} = req.params

    qrcode.toDataURL(totalAmount, (err, src) => {
        res.render("product/checkout-qrcode", {
            qr_code: src,
        })
    })

  }
}

module.exports = ProductController;
