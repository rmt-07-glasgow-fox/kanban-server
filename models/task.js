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
      Task.belongsTo(models.User);
      Task.belongsTo(models.Category);
    }
  };
  Task.init({
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: { tableName: 'Users' },
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: { tableName: 'Categories'},
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Title must be filled"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Description must be filled"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};