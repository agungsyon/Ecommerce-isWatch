const { Product } = require("../models");

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
}

module.exports = ProductController;
