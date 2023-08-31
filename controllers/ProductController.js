const dateFormat = require("../helpers/dateformat");
const { Product, ShopingOrder } = require("../models");
const qrcode = require("qrcode")

class ProductController {
  static addProduct(req, res) {
    const role = req.session.role;

    if (role == "admin") {
      res.render("product/add-product");
    } else {
      res.redirect("/");
    }
  }

  static postProduct(req, res) {
    const { name, description, price, stock, photo } = req.body;
    Product.create({ name, description, price, stock, photo })
      .then((_) => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static buyProduct(req, res) {
    const { id } = req.params;
    const UserId = req.session.userId;
    let quantity = 1;
    Product.findByPk(id)
      .then((product) => {
        const { price, stock } = product;
        let amount = price;
        let ProductId = id;

        return ShopingOrder.create({
          amount,
          quantity,
          ProductId,
          UserId,
        });
      })
      .then((_) => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static cartList(req, res) {
    const UserId = req.session.userId;

    ShopingOrder.findAll({
      where: UserId,
      include: Product,
      order: [["orderDate", "ASC"]],
    })
      .then((carts) => {
        res.render("product/cart-list", { carts, dateFormat });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static checkout(req, res) {
    const UserId = req.session.userId;

    ShopingOrder.destroy({ where: { UserId } })
    .then((_) => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static checkoutQrCode(req, res) {
    const {totalAmount} = req.params

    qrcode.toDataURL(totalAmount, (err, src) => {
        res.render("product/checkout-qrcode", {
            qr_code: src,
        })
    })

  }

  /**
   *   {
    "orderNumber": 6894,
    "amount": 280000,
    "quantity": 1,
    "orderDate": null,
    "UserId": 1,
    "ProductId": 5,
    "createdAt": "2023-08-31T10:31:15.103Z",
    "updatedAt": "2023-08-31T10:31:15.103Z",
    "Product": {
      "id": 5,
      "name": "Fossil Lux BQ2415",
      "description": "Ketebalan: 8mm\n Strap length: 250mm \nBand Width: 20mm \nDial diameter: 40mm \nTahan air: Tahan air. Tapi Anda harus menghindari air panas dan berenang, Anda bisa mencuci tangan. Gunakan saat hujan. \nGesper bahan: stainless steel \nJenis gerakan: kuarsa \nBahan tali: Kulit /Nilon.",
      "price": 280000,
      "stock": 6,
      "photo": "https://www.freedomtoexist.com/cdn/shop/products/4202M_Milanese_Rose_Gold_800x.jpg?v=1605464480",
      "createdAt": "2023-08-31T10:26:13.662Z",
      "updatedAt": "2023-08-31T10:26:13.662Z"
    }
  }
   */
}

module.exports = ProductController;
