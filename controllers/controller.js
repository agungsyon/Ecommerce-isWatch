const { Op } = require("sequelize");
const { Product, User, UserProfile } = require("../models");

class Controller {
  static homePage(req, res) {
    Product.findAll({
      includes: {model: User}
    })
      .then((products) => {
        // res.send(products)
        // console.log(products);
        res.render("home-page", { products });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
}

module.exports = Controller;
