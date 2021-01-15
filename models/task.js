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
      Task.belongsTo(models.User, { foreignKey: "UserId", targetKey: "id" })
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        isEmpty: function(value) {
          if(value == '' || value == null) {
            throw new Error('Title harus diisi!')
          }
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        isEmpty: function(value) {
          if(value == '' || value == null) {
            throw new Error('Title harus diisi!')
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};