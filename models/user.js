'use strict';
const { hashPassword } = require('../helper/bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Task)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {msg: 'Not a valid email format'},
        notEmpty: {msg: 'Email is required'},
        uniqueEmail (input) {
          console.log(input)
          User.findOne({where: {email: input}})
          .then(user => {
            if (user) {
              throw {message: 'Email already used'}
            }
          })
          .catch(err => {
            console.log(err)
          })
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Username is required'}
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'Username is required'},
        len: {
          args: [6],
          msg: 'Password at least 6 character'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};