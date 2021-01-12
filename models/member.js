'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Member.belongsTo(models.User);
      Member.belongsTo(models.Organization);
    }
  }
  Member.init(
    {
      role: {
        type: DataTypes.STRING,
        validate: { notEmpty: { args: true, msg: 'Role is required' } },
      },
      UserId: DataTypes.INTEGER,
      OrganizationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Member',
    }
  );
  return Member;
};
