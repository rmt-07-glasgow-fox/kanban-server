'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/brcypt');
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
      unique: true,
      validate: {
        isEmail: {
          msg: 'email not valid'
        },
        notEmpty: {
          msg: 'email must be filled'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len:{
          args: [6],
          msg: 'password atleast 6 character'
        },
        notEmpty: {
          msg: 'password must be filled'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: user => user.password = hashPassword(user.password)
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};