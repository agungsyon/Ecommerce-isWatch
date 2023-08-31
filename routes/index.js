const express = require('express')
const Controller = require('../controllers/controller')
const ControllerProduct = require('../controllers/controllerProduct')
const router = express.Router()
const routeUser = require("./user")
const routeProduct = require("./product")

router.use(routeUser)
router.use(routeProduct)

router.get('/', Controller.homePage)

module.exports = router