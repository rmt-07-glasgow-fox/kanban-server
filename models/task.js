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
      Task.belongsTo(models.User, {foreignKey: 'userId'})
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: `Title is required!!`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: `Description is required!!`
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: `Category is required!!`
        }
      }
    },
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};