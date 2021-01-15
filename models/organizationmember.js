'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrganizationMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrganizationMember.belongsTo(models.Organization)
      OrganizationMember.belongsTo(models.User)
    }
  };
  OrganizationMember.init({
    OrganizationId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'OrganizationMember',
  });
  return OrganizationMember;
};