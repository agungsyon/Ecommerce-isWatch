const { Op } = require("sequelize");
const { Product, User, UserProfile } = require("../models");

class Controller {
  static homePage(req, res) {
    const role = req.session.role;
    const userId = req.session.userId;
    let user = {};

    User.findByPk(userId, {
      include: { model: UserProfile },
    })
      .then((result) => {
        user = result;
        return Product.findAll();
      })
      .then((products) => {
        res.render("home-page", { user, products });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
}

module.exports = Controller;
