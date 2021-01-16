'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsTo(models.Board);
      Category.hasMany(models.Task);
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { args: true, msg: 'Name category is required' },
        },
      },
      BoardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notNull: { args: true, msg: 'Board ID is required' } },
      },
    },
    {
      sequelize,
      modelName: 'Category',
    }
  );
  return Category;
};
