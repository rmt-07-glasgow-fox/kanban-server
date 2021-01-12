'use strict';
const {
  Model
} = require('sequelize');
const encrypt = require('../helpers/bcryptHelper').encrypt

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
      validate:{
        isEmail:{
          msg: 'Please enter valid email.'
        },
        notEmpty:{
          msg: 'Email field is required.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        len: {
          args: [8],
          msg: 'Password must be at least 8 characters'
        },
        notEmpty: {
          msg: 'Password field is required'
        }
      }
    },
    first_name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'First name field is required.'
        }        
      }
    },
    last_name:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'Last name field is required.'
        }        
      }
    }
  }, {
    sequelize,
    hooks:{
      beforeCreate: (instance, options) => {
        instance.password = encrypt(instance.password)
      }
    },
    modelName: 'User',
  });
  return User;
};