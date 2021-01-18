'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Task, {foreignKey: 'UserId'})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Email field must be filled"
        },
        notNull: {
          msg: "Null Email not allowed"
        },
        isEmail: {
          args: true,
          msg: "Invalid email format"
        }
      },
      unique: {
        args: true,
        msg: 'Email address already in use!'
      }
    }, 
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password field must be filled"
        },
        notNull: {
          msg: "Null Password not allowed"
        },
        len: {
          args: [6],
          msg: "Password must contain minimum 6 characters"
        }
      },
    }, 
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Username field must be filled"
        },
        notNull: {
          msg: "Null Username not allowed"
        },
        len: {
          args: [6],
          msg: "Username must contain minimum 6 characters"
        }
      },
      unique: {
        args: true,
        msg: 'Username already in use!'
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};