'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsTo(models.User)
      Category.hasMany(models.Kanban)
    }
  };
  Category.init({
    name: {
      type: DataTypes.STRING,
      unique: {
        arg: true,
        msg: "Category must be unique"
      },
      validate: {
        notEmpty: {
          msg: "Category name must be filled"
        },
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};