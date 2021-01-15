'use strict';
const {
  Model
} = require('sequelize');
const {generateHash} = require("../helpers/bcrypt")
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
      unique: {
        args: 'email',
        msg: 'This Email is already exist'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email is Required'
        },
        isEmail: {
          args: 'email',
          msg: 'Email must be valid email address'
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password is Required'
        }, 
        len: {
          args: [6],
          msg: 'Password at least 6 characters'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, option) => {
        user.password = generateHash(user.password)
      }
    }
  });
  return User;
};