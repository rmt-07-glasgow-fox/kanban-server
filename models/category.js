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
      Category.hasMany(models.Task, {
        foreignKey: "CategoryId"
      })
    }
  };
  Category.init({
    name: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "This category name is not available"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Please insert category name"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};