'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task);
      User.hasMany(models.Organization);
      User.belongsTo(models.Member);
    }
  }
  User.init(
    {
      first_name: {
        type: DataTypes.STRING,
        validate: { notEmpty: { args: true, msg: 'First name is required' } },
      },
      last_name: {
        type: DataTypes.STRING,
        validate: { notEmpty: { args: true, msg: 'Last name is required' } },
      },
      email: {
        type: DataTypes.STRING,
        validate: { isEmail: { args: true, msg: 'Email not valid' } },
      },
      password: {
        type: DataTypes.STRING,
        validate: { notEmpty: { args: true, msg: 'First name is required' } },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
