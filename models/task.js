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
      // define association here
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:  {
          args: true,
          msg: 'Please input your title'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:  {
          args: true,
          msg: 'Please input your category'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};