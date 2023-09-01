const express = require('express')
const Controller = require('../controllers/controller')
const ProductController = require('../controllers/ProductController')
const router = express.Router()
const { isLoggedin } = require('../middlewares/auth')

router.use(isLoggedin)

router.get("/product/add", ProductController.addProduct)
router.post("/product/add", ProductController.postProduct)

router.get("/product/buy/:id", ProductController.buyProduct)

router.get("/cart", ProductController.cartList)
router.get("/cart/cancel/:id", ProductController.CancelCart)

router.get("/cart/checkout", ProductController.checkout)
router.get("/cart/checkout/qrcode/:totalAmount", ProductController.checkoutQrCode)

module.exports = router