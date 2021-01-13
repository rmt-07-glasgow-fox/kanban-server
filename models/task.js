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
      Task.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title must be filled"
        },
        notNull: {
          msg: "Null Title is not allowed"
        }
      }
    }, 
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Category must be filled"
        },
        notNull: {
          msg: "Null Category is not allowed"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};