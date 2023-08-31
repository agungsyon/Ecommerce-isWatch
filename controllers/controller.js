const { Op } = require("sequelize");
const { Product, User, UserProfile } = require("../models");

class Controller {
  static homePage(req, res) {
    const { search } = req.query;
    const userId = req.session.userId;
    let user = {};

    User.findByPk(userId, {
      include: { model: UserProfile },
    })
      .then((result) => {
        user = result;
        const options = {
          where: {}
        }

        return Product.scopeSearchProduct(search, options);  // using static method in model
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
