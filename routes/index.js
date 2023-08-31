const express = require('express')
const Controller = require('../controllers/controller')
const ControllerProduct = require('../controllers/controllerProduct')
const router = express.Router()
const routeUser = require("./user")

router.use(routeUser)

router.get('/', Controller.homePage)

module.exports = router