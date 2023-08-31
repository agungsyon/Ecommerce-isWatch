const { Op } = require("sequelize");
const { User, UserProfile } = require("../models");
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

    User.findOne({
      where: { username },
      include: { model: UserProfile },
    })
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
    res.render("user-pages/register-form");
  }

  static postRegister(req, res) {
    const { email, username, password, role } = req.body;

    User.create({ email, username, password, role })
      .then((_) => {
        res.redirect("/login");
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static userProfile(req, res) {
    const { id } = req.params;

    User.findByPk(id)
      .then((user) => {
        res.render("user-pages/user-profile-form", { user });
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
}

module.exports = UserController;
