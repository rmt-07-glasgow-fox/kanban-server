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
      Task.belongsTo(models.User)
      Task.belongsTo(models.Category)
      // define association here
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CategoryId:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};