const { Op } = require("sequelize");
const { Product } = require("../models");

class Controller {
  static homePage(req, res) {
    Product.findAll()
      .then((products) => {
        res.render("login", { products });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
}

module.exports = Controller;
