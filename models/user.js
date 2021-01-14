'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
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
      User.belongsToMany(models.Organization, {
        through: 'Members',
        foreignkey: 'UserId',
      });
    }
  }
  User.init(
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'First name is required' },
          notEmpty: { args: true, msg: 'First name is required' },
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Last name is required' },
          notEmpty: { args: true, msg: 'Last name is required' },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Email is required' },
          notEmpty: { args: true, msg: 'Email is required' },
          isEmail: {
            args: true,
            msg: 'Email not valid',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Password is required' },
          notEmpty: { args: true, msg: 'Password is required' },
          len: {
            args: [6, 50],
            msg: 'Password at least 6 characters',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: (user, options) => {
          user.password = hashPassword(user.password);
        },
      },
    }
  );
  return User;
};
