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
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'Fill your task title'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Fill Your Category'
        }
      }
    },
    date: {
      type: DataTypes.DATE,
      validate:{
        isDate:{
          msg: 'Input your date time'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg : 'insert your user id'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  Task.addHook('beforeCreate', (instance, options) => {
    instance.date = new Date()
  })

  return Task;
};