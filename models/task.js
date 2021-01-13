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
      Task.belongsTo(models.User)
    }
  };
  Task.init({
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });

  Task.beforeCreate((task, opt) => {
    if (!task.title || task.title.trim() == '') {
      task.title = 'Untitled'
    }
  })

  Task.beforeUpdate((task, opt) => {
    if (task.title.trim() == '') {
      task.title = 'Untitled'
    }
  })
  return Task;
};