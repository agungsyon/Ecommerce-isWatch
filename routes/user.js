const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.get("/login", UserController.loginForm)
router.post("/login", UserController.postLogin)

router.get("/register", UserController.registerForm)
router.post("/register", UserController.postRegister)

router.get("/userprofile/:id", UserController.userProfile)
router.post("/userprofile/:id", UserController.postProfile)


module.exports = router