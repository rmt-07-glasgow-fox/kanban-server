'use strict';
const { Model } = require('sequelize');
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
  }
  Task.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Title is required' },
          notEmpty: { args: true, msg: 'Title task is required' },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notNull: { args: true, msg: 'User ID is required' } },
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notNull: { args: true, msg: 'Category ID is required' } },
      },
    },
    {
      sequelize,
      modelName: 'Task',
    }
  );
  return Task;
};
