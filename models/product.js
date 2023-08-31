"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.ShopingOrder);
      Product.belongsToMany(models.User, { through: models.ShopingOrder });
    }

    static scopeSearchProduct(search, options) {
      if (search) {
        options.where.name = { [Op .iLike]: `%${search}%` };
      }
      options.where.stock = { [Op.gt]: 0 };
      options.order = [["name", "ASC"]];

      return Product.findAll(options);
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
