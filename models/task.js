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
        foreignKey: 'UserId'
      })
      Task.belongsTo(models.Category, {
        foreignKey: 'CategoryId'
      })
    }
  };
  Task.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
    hooks: {
      beforeCreate(instance, options) {
        instance.CategoryId = 1
      }
    }
  });
  return Task;
};