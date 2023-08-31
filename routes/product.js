const express = require('express')
const router = express.Router()
const ControllerProduct = require('../controllers/controllerProduct.js')

router.get("/userprofile/:id/add", ControllerProduct.addOrder)
router.post("/userprofile/:id/add", ControllerProduct.updateOrder)


module.exports = router