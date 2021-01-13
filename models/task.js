'use strict';
const {
  Model
} = require('sequelize');
const yesterday = require('../helpers/yesterday');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {

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
          msg: 'Please input title'
        },
        len: {
          args: [3, 20],
          msg: 'Please input title between 3 to 20 characters'
        }
      }
    },
    detail: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      validation: {
        isYesterday(val) {
          if (val <= yesterday()) {
            throw {
              message: 'Please input date greater than yesterday'
            }
          }
        }
      }
    },
    category: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};