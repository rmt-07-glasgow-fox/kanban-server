"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Organization, {
        foreignKey: "OrganizationId"
      });
      User.hasMany(models.Task, {
        foreignKey: "UserId"
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "This username is not available",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "Please insert username",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Please insert email",
          },
          isEmail: {
            args: true,
            msg: "Must be a valid email address",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Please insert password",
          },
          len: {
            args: [6],
            msg: "Password length must be at least 6 characters or more",
          },
        },
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      OrganizationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(instance, options) {
          instance.password = hashPassword(instance.password);
        },
      },
    }
  );
  return User;
};
