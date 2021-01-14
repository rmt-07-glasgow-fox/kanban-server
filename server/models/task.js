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
      Task.belongsToMany(models.User, {through: models.UserTask, foreignKey: "id"})
      Task.hasMany(models.UserTask, {foreignKey:"TaskId", targetKey: "id"})
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Title Required"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Description Required"
        }
      }
    },
    dueDate: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "dueDate Required"
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Date Required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};