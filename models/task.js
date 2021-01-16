"use strict";
const { Model, TableHints } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.Category, {
        foreignKey: "CategoryId"
      });
      Task.belongsTo(models.User, {
        foreignKey: "UserId"
      });
      Task.belongsTo(models.Organization, {
        foreignKey: "OrganizationId"
      });
    }
  }
  Task.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Please insert task title"
          }
        }
      },
      CategoryId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      OrganizationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
