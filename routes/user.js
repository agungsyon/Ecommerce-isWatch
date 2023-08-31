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

router.get("/userprofile/:id", UserController.userProfile);
router.post("/userprofile/:id", UserController.postProfile);

module.exports = router;
