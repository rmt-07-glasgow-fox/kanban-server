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
      Task.belongsTo(models.User, {
        foreignKey: "userId",
      })
      Task.belongsTo(models.Category, {
        foreignKey: "userId",
      })
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Category name must be filled"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Task title must be filled"
        },
      }
    },
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};