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
      Category.belongsTo(models.Organization, { foreignKey: "orgId" });
      Category.hasMany(models.Task, { foreignKey: "categoryId" });
    }
  };
  Category.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Category name required!"
        }
      }
    },
    orgId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};