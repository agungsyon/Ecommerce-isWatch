const express = require('express')
const Controller = require('../controllers/controller')
const ProductController = require('../controllers/ProductController')
const router = express.Router()
const routeUser = require("./user")
const routeProduct = require("./product")
const { isLoggedin } = require('../middlewares/auth')

router.use(routeUser)
router.use(routeProduct)
router.use(isLoggedin)

router.get('/', Controller.homePage)

module.exports = router