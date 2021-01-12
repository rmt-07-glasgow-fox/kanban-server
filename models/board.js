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
    }
  }
  Board.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: { notEmpty: { args: true, msg: 'Name board is required' } },
      },
      OrganizationId: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Board',
    }
  );
  return Board;
};
