"use strict";
const { Model } = require("sequelize");
const dateFormat = require("../helpers/dateformat");
module.exports = (sequelize, DataTypes) => {
  class ShopingOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ShopingOrder.belongsTo(models.Product);
      ShopingOrder.belongsTo(models.User);
    }

    get formatDateEdit() {
      return dateFormat(this.createdAt);
    }

    resiCode() {
      const resi = Math.floor(Math.random() * 10000)
      const amountStr = this.amount.toString();
      const lastThreeDigits = amountStr.substr(amountStr.length - 3);
      const result = this.ProductId + lastThreeDigits + resi + this.UserId

      return result
    }
  }
  ShopingOrder.init(
    {
      orderNumber: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      orderDate: DataTypes.DATE,
      UserId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ShopingOrder",
    }
  );

  ShopingOrder.beforeCreate((instance, options) => {
    
    instance.orderNumber = instance.resiCode()
    instance.orderDate = new Date()
  });

  return ShopingOrder;
};
