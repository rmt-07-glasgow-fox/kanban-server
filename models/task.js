'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, { foreignKey: "userId" });
      Task.belongsTo(models.Organization, { foreignKey: "orgId" });
      Task.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
  };
  Task.init({
    userId: DataTypes.INTEGER,
    orgId: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Title required!"
        }
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Category required!"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};