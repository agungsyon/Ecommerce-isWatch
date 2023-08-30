const express = require('express')
const Controller = require('../controllers/controller')
const ControllerUser = require('../controllers/controllerUser')
const ControllerProduct = require('../controllers/controllerProduct')
const router = express.Router()

router.get('/', Controller.homePage)

module.exports = router