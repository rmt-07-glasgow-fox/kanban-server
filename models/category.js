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
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Category is already registered' },
      validate: {
        notEmpty: { msg: 'Category is Empty' },
        notNull: { msg: 'Category is null' }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};