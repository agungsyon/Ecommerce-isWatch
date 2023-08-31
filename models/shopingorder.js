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
    
    instance.orderNumber = Math.floor(Math.random() * 10000);
    instance.orderDate = new Date()
  });

  return ShopingOrder;
};
