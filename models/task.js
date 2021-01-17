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
      Task.belongsTo(models.User),
        Task.belongsTo(models.Category)
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Title is empty' },
        notNull: { msg: 'Title is null' }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'UserId is null' },
        notEmpty: { msg: 'UserId is empty' },
        isInt: { msg: 'UserId must be integer' }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'CategoryId is null' },
        notEmpty: { msg: 'CategoryId is empty' },
        isInt: { msg: 'CategoryId must be integer' }
      }
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};