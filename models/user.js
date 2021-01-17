'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/bcrypt');
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
      validate:{
        notEmpty:{
          args:true,
          msg: 'Email harus diisi'
        },
        isEmail:{
          args:true,
          msg:'Harus berformat email'
        }
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len:{
          args:[6],
          msg: 'Password Minimal 6 karakter'
        }
      }
    }
  }, {
    hooks:{
      beforeCreate: (user,option)=>{
        user.password = hash(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};