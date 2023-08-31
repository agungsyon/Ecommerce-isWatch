const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { isLoggedin } = require("../middlewares/auth");

router.get("/login", UserController.loginForm);
router.post("/login", UserController.postLogin);

router.get("/register", UserController.registerForm);
router.post("/register", UserController.postRegister);

router.use(isLoggedin);

router.get("/logout", UserController.logoutUser);

router.get("/customer", UserController.allCustoler);

router.get("/user/remove/:id", UserController.removeCustomer)

router.get("/userprofile/:id", UserController.userProfile);
router.post("/userprofile/:id", UserController.postProfile);

router.get("/showprofile", UserController.detailProfile)

router.get("/profile/edit/picture", UserController.editProfile)
router.post("/profile/edit/picture", UserController.postEditProfile)

module.exports = router;
