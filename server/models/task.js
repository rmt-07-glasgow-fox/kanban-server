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
      Task.belongsTo(models.User, { foreignKey: "UserId" })
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {
          args: true,
          msg: "Title Should Not Be Empty"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {
          args: true,
          msg: "Please Describe Your Task"
        }
      }
    },
    assign_to: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {
          args: true,
          msg: "You Need to Specify Whom This Task Assigned To"
        }
      }
    },
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};