'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.hasMany(models.Task)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please input email'
        },
        isEmail: {
          msg: 'Please input in email format'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please input name'
        },
        len: {
          args: [3, 30],
          msg: 'Please input name between 3 to 30 characters'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please input password'
        },
        len: {
          args: [6, 20],
          msg: 'Please input password between 6 to 20 characters'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        instance.password = hashPass(instance.password);
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};