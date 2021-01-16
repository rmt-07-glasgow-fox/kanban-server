'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcryptjs');
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
      validate: {
        isEmail: {
          args: true,
          msg: 'Your email is containing Invalid format'
        },
        notEmpty: {
          args: true,
          msg: 'Email required'
        }
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Input password required'
        },
        len: {
          args: [6],
          msg: 'Password atleast 6 characters'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Input name required'
        },
        len: {
          args: [2],
          msg: 'There is no name with only 1 or 2 words'
        }
      }
    }
  },
  {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPass(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};