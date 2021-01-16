'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Board.hasMany(models.Category);
      Board.belongsTo(models.Organization);
    }
  }
  Board.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Name is required' },
          notEmpty: { args: true, msg: 'Name board is required' },
        },
      },
      OrganizationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Organization ID is required' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Board',
    }
  );
  return Board;
};
