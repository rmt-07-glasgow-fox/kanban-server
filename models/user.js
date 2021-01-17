'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/password')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Email already registered' },
      validate: {
        isEmail: { msg: 'Email is invalid format' },
        notNull: { msg: 'Email is null' },
        notEmpty: { msg: 'Email is empty' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Password is empty' },
        notNull: { msg: 'Password is null' },
        len: { args: [6], msg: 'Password length minimum is 6 characters' }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (instance, options) => {
        instance.password = hashPassword(instance.password)
      }
    }
  });
  return User;
};