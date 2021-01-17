"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt.js");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task);
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name required",
          },
          notEmpty: {
            msg: "Name required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Invalid email format",
          },
          notNull: {
            msg: "Email required",
          },
          notEmpty: {
            msg: "Email required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password required",
          },
          len: {
            args: [3],
            msg: "Password at least 3 chararcters",
          },
          notEmpty: {
            msg: "Password required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.addHook("beforeCreate", "hashPassword", (instance, options) => {
    instance.password = hashPassword(instance.password);
  });
  return User;
};
