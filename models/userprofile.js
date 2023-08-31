'use strict';

const dateFormat = require("../helpers/dateformat");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User)
    }

    formatDateEdit() {
      return dateFormat(this.dateOfBirth);
    }
  }
  UserProfile.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "name has required",
        },
        notNull: {
          args: true,
          msg: "name has required",
        },
      },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "gender has required",
        },
        notNull: {
          args: true,
          msg: "gender has required",
        },
      },
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "dateOfBirth has required",
        },
        notNull: {
          args: true,
          msg: "dateOfBirth has required",
        },
      },
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "profilePicture has required",
        },
        notNull: {
          args: true,
          msg: "profilePicture has required",
        },
      },
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};