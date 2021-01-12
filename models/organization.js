'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Organization.belongsToMany(models.User, {
        through: 'Members',
        foreignkey: 'UserId',
      });
    }
  }
  Organization.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Name is required' },
          notEmpty: { args: true, msg: 'Role is required' },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'User ID is required' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Organization',
    }
  );
  return Organization;
};
