'use strict';
const {hashing} = require('../helper/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automaticalclearly.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Kanban)
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
  }, {
    hooks:{
      beforeCreate:(user)=>{
        if (user.password) {
          user.password = hashing(user.password)
        }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};