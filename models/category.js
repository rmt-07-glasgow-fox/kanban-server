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
      Category.hasMany(models.Task)
    }
  };
  Category.init({
    name: {
      type: DataTypes.STRING,
      unique: true,
      validate:{
        notEmpty:{
          msg: 'Category name field is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};