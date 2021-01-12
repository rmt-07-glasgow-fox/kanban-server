'use strict';
const {generatePassword} = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task, {foreignKey: 'UserId'})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please input your email'
        },
        isEmail: {
          args: true,
          msg: 'Please input your email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please input your password'
        },
        len : {
          args: [6],
          msg: 'Minimal 6 characters'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = generatePassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};