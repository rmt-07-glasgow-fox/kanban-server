"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Organization.hasMany(models.User, {
        foreignKey: "OrganizationId"
      });
      Organization.hasMany(models.Task, {
        foreignKey: "OrganizationId"
      });
    }
  }
  Organization.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "This organization name is not available",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "Please insert organization name",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Organization",
    }
  );
  return Organization;
};
