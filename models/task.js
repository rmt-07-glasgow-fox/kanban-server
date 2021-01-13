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
      Task.belongsTo(models.User)
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title cannot be empty"
        }
      }
    },
    detail: DataTypes.STRING,
    category: DataTypes.STRING,
    assign: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    hooks: {
      beforeCreate: (instance,options) => {
        instance.category = "backlog"
      }
    },
    sequelize,
    modelName: 'Task',
  });
  return Task;
};