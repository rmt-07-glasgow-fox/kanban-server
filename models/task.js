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
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please insert your title!'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        // len: {
        //   args: [_, 50],
        //   msg: 'Max length for description is 50 characters'
        // }
      }
    },
    duedate: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please insert your due date!'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please insert your category!'
        }
      }
    },
    UserId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};