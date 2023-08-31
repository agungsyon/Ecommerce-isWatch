const { Op } = require("sequelize");
const { User, UserProfile, ShopingOrder } = require("../models");
const bcrypt = require("bcryptjs");
// const session = require('express-session')

class UserController {
  static loginForm(req, res) {
    const { error } = req.query;
    User.findAll()
      .then((users) => {
        // res.redirect()
        res.render("user-pages/login-form", { error });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static postLogin(req, res) {
    const { username, password } = req.body;

    const options = {
      where: { username },
      include: { model: UserProfile },
    };
    User.findOne(options)
      .then((user) => {
        if (user) {
          req.session.userId = user.id;
          req.session.role = user.role;

          const isValidPassword = bcrypt.compareSync(password, user.password);

          if (isValidPassword) {
            if (!user.UserProfile) {
              res.redirect(`/userprofile/${user.id}`);
            } else {
              res.redirect("/");
            }
          } else {
            const error = "invalid password";
            res.redirect(`/login?error=${error}`);
          }
        } else {
          const error = "invalid User Name";
          res.redirect(`/login?error=${error}`);
        }
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static logoutUser(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.redirect("/login");
      }
    });
  }

  static registerForm(req, res) {
    const { error } = req.query;
    res.render("user-pages/register-form", { error });
  }

  static postRegister(req, res) {
    const { email, username, password, role } = req.body;

    User.create({ email, username, password, role })
      .then((_) => {
        res.redirect("/login");
      })
      .catch((err) => {
        if (err.name == "SequelizeValidationError") {
          const errors = [];
          err.errors.forEach((e) => {
            errors.push(e.message);
          });
          console.log(errors);
          res.redirect(`/register?error=${errors}`);
        } else {
          console.log(err);
          res.send(err);
        }
      });
  }

  static userProfile(req, res) {
    const { id } = req.params;
    const { error } = req.query;

    User.findByPk(id)
      .then((user) => {
        res.render("user-pages/user-profile-form", { user, error });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static postProfile(req, res) {
    const { id: UserId } = req.params;
    const { name, gender, dateOfBirth, profilePicture } = req.body;
    UserProfile.create({ name, gender, dateOfBirth, profilePicture, UserId })
      .then((_) => {
        res.redirect("/");
      })
      .catch((err) => {
        if (err.name == "SequelizeValidationError") {
          const errors = [];
          err.errors.forEach((e) => {
            errors.push(e.message);
          });
          console.log(errors);
          res.redirect(`/userprofile/${UserId}?error=${errors}`);
        } else {
          console.log(err);
          res.send(err);
        }
      });
  }

  static allCustoler(req, res) {
    User.findAll({ include: UserProfile, order: [["email", "ASC"]] })
      .then((users) => {
        console.log(users);
        res.render("user-pages/all-customers", { users });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static removeCustomer(req, res) {
    const { id } = req.params;

    ShopingOrder.destroy({ where: { UserId: id } })
    .then((_) => {
        return UserProfile.destroy({ where: { UserId: id } })
      })
      .then((_) => {
        return User.destroy({ where: { id: id } });
      })//
      .then((_) => {
        res.redirect("/customer");
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static detailProfile(req, res) {
    const id = req.session.userId;

    User.findByPk(id, {
      include: { model: UserProfile },
    })
      .then((user) => {
        res.render("user-pages/view-user-profile", { user });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static editProfile(req, res) {
    const id = req.session.userId;
    const { error } = req.query;

    User.findByPk(id, { include: { model: UserProfile } })
      .then((user) => {
        console.log(user);
        res.render("user-pages/edit-user-profile", { user, error });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static postEditProfile(req, res) {
    const UserId = req.session.userId;
    const { name, profilePicture } = req.body;

    UserProfile.update({ name, profilePicture }, { where: { UserId } })
      .then((_) => {
        res.redirect("/showprofile");
      })
      .catch((err) => {
        if (err.name == "SequelizeValidationError") {
          const errors = [];
          err.errors.forEach((e) => {
            errors.push(e.message);
          });
          console.log(errors);
          res.redirect(`/profile/edit/picture?error=${errors}`);
        } else {
          console.log(err);
          res.send(err);
        }
      });
  }
}

module.exports = UserController;
