'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Organization.belongsToMany(models.User, { through: models.Member, foreignKey: "orgId" });
      Organization.hasMany(models.Task, { foreignKey: "orgId" });
      Organization.hasMany(models.Category, { foreignKey: "orgId" });
    }
  };
  Organization.init({
    name:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Organization name required!"
        }
      }
    },
    admin: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};