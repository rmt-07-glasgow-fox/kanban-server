'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kanban extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kanban.belongsTo(models.User)
      Kanban.belongsTo(models.Category)
    }
  };
  Kanban.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Title must be filled"
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Category Id must be filled"
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Kanban',
  });
  return Kanban;
};